import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import { connectDB } from "./db";
import { AdminModel, CampModel, VaccineModel, SchemeModel, AuditLogModel } from "./models";
import { authMiddleware, generateToken, type AuthRequest } from "./middleware/auth";
import { answerFAQ } from "./gemini";
import { insertAdminSchema, insertCampSchema, insertVaccineSchema, insertSchemeSchema } from "@shared/schema";

// Rate limiter for public endpoints
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

const faqLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: 'Too many FAQ requests, please try again later.'
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to MongoDB
  await connectDB();

  // PUBLIC ROUTES

  // Get all camps
  app.get('/api/camps', publicLimiter, async (req, res) => {
    try {
      const camps = await CampModel.find().sort({ date: 1 }).lean();
      res.json(camps);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch camps' });
    }
  });

  // Get single camp
  app.get('/api/camps/:id', publicLimiter, async (req, res) => {
    try {
      const camp = await CampModel.findById(req.params.id).lean();
      if (!camp) {
        return res.status(404).json({ error: 'Camp not found' });
      }
      res.json(camp);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch camp' });
    }
  });

  // Get all vaccines
  app.get('/api/vaccines', publicLimiter, async (req, res) => {
    try {
      const vaccines = await VaccineModel.find().sort({ name: 1 }).lean();
      res.json(vaccines);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch vaccines' });
    }
  });

  // Get all schemes
  app.get('/api/schemes', publicLimiter, async (req, res) => {
    try {
      const schemes = await SchemeModel.find().sort({ name: 1 }).lean();
      res.json(schemes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch schemes' });
    }
  });

  // Helper function to detect if query needs AI
  function needsAI(query: string, keywordResultsCount: number): boolean {
    const lowerQuery = query.toLowerCase();
    
    // Check for question indicators
    const hasQuestionMark = query.includes('?');
    const hasQuestionWords = /^(what|when|where|which|who|how|any|is there|are there|do you|can you)/i.test(query);
    
    // Check for date patterns (DD-MM-YYYY, DD/MM/YYYY, etc.)
    const hasDatePattern = /\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}/.test(query);
    const hasTemporalWords = /(today|tomorrow|yesterday|next week|this month|on|date|when)/i.test(query);
    
    // Check if keyword search returned few results
    const hasLowResults = keywordResultsCount < 2;
    
    // Use AI if it's clearly a question, has dates, or got poor keyword results
    return hasQuestionMark || hasQuestionWords || hasDatePattern || hasTemporalWords || (hasLowResults && query.split(' ').length > 3);
  }

  // Smart search endpoint (keyword + AI hybrid)
  app.get('/api/search', publicLimiter, async (req, res) => {
    try {
      const query = req.query.q as string;
      const language = (req.query.lang as 'en' | 'hi' | 'te') || 'en';
      
      if (!query) {
        return res.json({ camps: [], vaccines: [], schemes: [], aiAnswer: null });
      }

      const searchRegex = new RegExp(query, 'i');

      // Step 1: Always do keyword search first (fast and cheap)
      const [camps, vaccines, schemes] = await Promise.all([
        CampModel.find({
          $or: [
            { title: searchRegex },
            { description: searchRegex },
            { location: searchRegex },
            { type: searchRegex }
          ]
        }).lean(),
        VaccineModel.find({
          $or: [
            { name: searchRegex },
            { ageGroup: searchRegex },
            { scheduleNotes: searchRegex }
          ]
        }).lean(),
        SchemeModel.find({
          $or: [
            { name: searchRegex },
            { description: searchRegex },
            { eligibility: searchRegex },
            { benefits: searchRegex }
          ]
        }).lean()
      ]);

      const totalResults = camps.length + vaccines.length + schemes.length;

      // Step 2: Detect if query needs AI assistance
      const shouldUseAI = needsAI(query, totalResults);

      let aiAnswer = null;
      if (shouldUseAI) {
        try {
          // Call Perplexity AI for natural language understanding
          const faqResult = await answerFAQ(query, language);
          aiAnswer = {
            answer: faqResult.answer,
            sources: faqResult.sources,
            outOfScope: faqResult.outOfScope
          };
        } catch (aiError) {
          console.error('AI search enhancement failed:', aiError);
          // Don't fail the whole search if AI fails, just skip AI answer
        }
      }

      res.json({ 
        camps, 
        vaccines, 
        schemes,
        aiAnswer,
        usedAI: shouldUseAI 
      });
    } catch (error) {
      res.status(500).json({ error: 'Search failed' });
    }
  });

  // FAQ endpoint
  app.post('/api/faq/query', faqLimiter, async (req, res) => {
    try {
      const { query, language } = req.body;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query is required' });
      }

      const lang = ['en', 'hi', 'te'].includes(language) ? language : 'en';
      const result = await answerFAQ(query, lang);
      
      res.json(result);
    } catch (error) {
      console.error('FAQ error:', error);
      res.status(500).json({ error: 'Failed to process query' });
    }
  });

  // ADMIN ROUTES

  // Admin login
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const admin = await AdminModel.findOne({ email });
      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(admin._id.toString(), admin.email);

      res.json({
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  });

  // Helper function to log admin actions
  async function logAdminAction(
    adminId: string,
    adminEmail: string,
    action: string,
    entityType: 'camp' | 'vaccine' | 'scheme',
    entityId: string,
    details: string
  ) {
    await AuditLogModel.create({
      adminId,
      adminEmail,
      action,
      entityType,
      entityId,
      details
    });
  }

  // Create camp
  app.post('/api/admin/camps', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const validated = insertCampSchema.parse(req.body);
      const camp = await CampModel.create(validated);
      
      await logAdminAction(
        req.adminId!,
        req.adminEmail!,
        'CREATE_CAMP',
        'camp',
        camp._id.toString(),
        `Created camp: ${camp.title}`
      );

      res.status(201).json(camp);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to create camp' });
    }
  });

  // Update camp
  app.put('/api/admin/camps/:id', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const validated = insertCampSchema.parse(req.body);
      const camp = await CampModel.findByIdAndUpdate(
        req.params.id,
        { ...validated, lastUpdated: new Date() },
        { new: true }
      );

      if (!camp) {
        return res.status(404).json({ error: 'Camp not found' });
      }

      await logAdminAction(
        req.adminId!,
        req.adminEmail!,
        'UPDATE_CAMP',
        'camp',
        camp._id.toString(),
        `Updated camp: ${camp.title}`
      );

      res.json(camp);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to update camp' });
    }
  });

  // Delete camp
  app.delete('/api/admin/camps/:id', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const camp = await CampModel.findByIdAndDelete(req.params.id);

      if (!camp) {
        return res.status(404).json({ error: 'Camp not found' });
      }

      await logAdminAction(
        req.adminId!,
        req.adminEmail!,
        'DELETE_CAMP',
        'camp',
        camp._id.toString(),
        `Deleted camp: ${camp.title}`
      );

      res.json({ message: 'Camp deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete camp' });
    }
  });

  // Create vaccine
  app.post('/api/admin/vaccines', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const validated = insertVaccineSchema.parse(req.body);
      const vaccine = await VaccineModel.create(validated);
      
      await logAdminAction(
        req.adminId!,
        req.adminEmail!,
        'CREATE_VACCINE',
        'vaccine',
        vaccine._id.toString(),
        `Created vaccine: ${vaccine.name}`
      );

      res.status(201).json(vaccine);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to create vaccine' });
    }
  });

  // Update vaccine
  app.put('/api/admin/vaccines/:id', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const validated = insertVaccineSchema.parse(req.body);
      const vaccine = await VaccineModel.findByIdAndUpdate(
        req.params.id,
        { ...validated, lastUpdated: new Date() },
        { new: true }
      );

      if (!vaccine) {
        return res.status(404).json({ error: 'Vaccine not found' });
      }

      await logAdminAction(
        req.adminId!,
        req.adminEmail!,
        'UPDATE_VACCINE',
        'vaccine',
        vaccine._id.toString(),
        `Updated vaccine: ${vaccine.name}`
      );

      res.json(vaccine);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to update vaccine' });
    }
  });

  // Delete vaccine
  app.delete('/api/admin/vaccines/:id', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const vaccine = await VaccineModel.findByIdAndDelete(req.params.id);

      if (!vaccine) {
        return res.status(404).json({ error: 'Vaccine not found' });
      }

      await logAdminAction(
        req.adminId!,
        req.adminEmail!,
        'DELETE_VACCINE',
        'vaccine',
        vaccine._id.toString(),
        `Deleted vaccine: ${vaccine.name}`
      );

      res.json({ message: 'Vaccine deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete vaccine' });
    }
  });

  // Create scheme
  app.post('/api/admin/schemes', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const validated = insertSchemeSchema.parse(req.body);
      const scheme = await SchemeModel.create(validated);
      
      await logAdminAction(
        req.adminId!,
        req.adminEmail!,
        'CREATE_SCHEME',
        'scheme',
        scheme._id.toString(),
        `Created scheme: ${scheme.name}`
      );

      res.status(201).json(scheme);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to create scheme' });
    }
  });

  // Update scheme
  app.put('/api/admin/schemes/:id', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const validated = insertSchemeSchema.parse(req.body);
      const scheme = await SchemeModel.findByIdAndUpdate(
        req.params.id,
        { ...validated, lastUpdated: new Date() },
        { new: true }
      );

      if (!scheme) {
        return res.status(404).json({ error: 'Scheme not found' });
      }

      await logAdminAction(
        req.adminId!,
        req.adminEmail!,
        'UPDATE_SCHEME',
        'scheme',
        scheme._id.toString(),
        `Updated scheme: ${scheme.name}`
      );

      res.json(scheme);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to update scheme' });
    }
  });

  // Delete scheme
  app.delete('/api/admin/schemes/:id', authMiddleware, async (req: AuthRequest, res) => {
    try {
      const scheme = await SchemeModel.findByIdAndDelete(req.params.id);

      if (!scheme) {
        return res.status(404).json({ error: 'Scheme not found' });
      }

      await logAdminAction(
        req.adminId!,
        req.adminEmail!,
        'DELETE_SCHEME',
        'scheme',
        scheme._id.toString(),
        `Deleted scheme: ${scheme.name}`
      );

      res.json({ message: 'Scheme deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete scheme' });
    }
  });

  // Get audit logs
  app.get('/api/admin/logs', authMiddleware, async (req, res) => {
    try {
      const logs = await AuditLogModel.find()
        .sort({ timestamp: -1 })
        .limit(50)
        .lean();
      
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch logs' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
