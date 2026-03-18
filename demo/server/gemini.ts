// Perplexity AI integration for FAQ chatbot
import { CampModel, VaccineModel, SchemeModel } from "./models";

const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || "";

interface Source {
  type: 'camp' | 'vaccine' | 'scheme';
  id: string;
  title: string;
}

export async function answerFAQ(query: string, language: 'en' | 'hi' | 'te'): Promise<{
  answer: string;
  sources: Source[];
  outOfScope: boolean;
}> {
  // Check if API key is set
  if (!PERPLEXITY_API_KEY) {
    throw new Error('PERPLEXITY_API_KEY environment variable is not set');
  }

  // Fetch all data
  const [camps, vaccines, schemes] = await Promise.all([
    CampModel.find().select('_id title description location date time type status').lean(),
    VaccineModel.find().select('_id name ageGroup scheduleNotes nextDoseInfo').lean(),
    SchemeModel.find().select('_id name description eligibility benefits').lean()
  ]);

  // Create context for AI
  const systemPrompt = `You are a health information assistant for Arogya, a village health information system.

STRICT RULES:
1. You can ONLY answer questions about:
   - Health camps (dates, locations, types)
   - Vaccination schedules (age groups, timing)
   - Government health schemes (eligibility, benefits)

2. You MUST NOT:
   - Provide medical diagnosis
   - Give personal medical advice
   - Recommend medicines or treatments
   - Answer personal health questions

3. If a question is outside your scope, respond EXACTLY with:
   "I cannot answer medical or personal health questions. Please contact a health professional or local clinic."

4. When answering, use information from the provided data.

Available Data:
CAMPS: ${JSON.stringify(camps, null, 2)}
VACCINES: ${JSON.stringify(vaccines, null, 2)}
SCHEMES: ${JSON.stringify(schemes, null, 2)}

Language: Respond in ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Telugu'}`;

  try {
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', response.status, errorText);
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

    // Check if out of scope
    const outOfScope = answer.includes("cannot answer medical") || 
                       answer.includes("contact a health professional") ||
                       answer.includes("चिकित्सा") ||
                       answer.includes("వైద్య");

    // Extract sources by finding IDs in the answer
    const sources: Source[] = [];
    const campIds = camps.map(c => c._id.toString());
    const vaccineIds = vaccines.map(v => v._id.toString());
    const schemeIds = schemes.map(s => s._id.toString());

    // Simple ID extraction from response
    campIds.forEach(id => {
      const camp = camps.find(c => c._id.toString() === id);
      if (camp && answer.includes(id)) {
        sources.push({ type: 'camp', id, title: camp.title });
      }
    });

    vaccineIds.forEach(id => {
      const vaccine = vaccines.find(v => v._id.toString() === id);
      if (vaccine && answer.includes(id)) {
        sources.push({ type: 'vaccine', id, title: vaccine.name });
      }
    });

    schemeIds.forEach(id => {
      const scheme = schemes.find(s => s._id.toString() === id);
      if (scheme && answer.includes(id)) {
        sources.push({ type: 'scheme', id, title: scheme.name });
      }
    });

    // If no specific IDs mentioned but answer references data, add general sources
    if (sources.length === 0 && !outOfScope) {
      // Check keywords to add relevant sources
      const lowerAnswer = answer.toLowerCase();
      
      if (lowerAnswer.includes('camp') || lowerAnswer.includes('शिविर') || lowerAnswer.includes('శిబిర')) {
        camps.slice(0, 3).forEach(camp => {
          sources.push({ type: 'camp', id: camp._id.toString(), title: camp.title });
        });
      }
      
      if (lowerAnswer.includes('vaccine') || lowerAnswer.includes('vaccination') || 
          lowerAnswer.includes('टीका') || lowerAnswer.includes('టీకా')) {
        vaccines.slice(0, 3).forEach(vaccine => {
          sources.push({ type: 'vaccine', id: vaccine._id.toString(), title: vaccine.name });
        });
      }
      
      if (lowerAnswer.includes('scheme') || lowerAnswer.includes('योजना') || lowerAnswer.includes('పథకం')) {
        schemes.slice(0, 3).forEach(scheme => {
          sources.push({ type: 'scheme', id: scheme._id.toString(), title: scheme.name });
        });
      }
    }

    return {
      answer,
      sources,
      outOfScope
    };
  } catch (error) {
    console.error('Perplexity API error:', error);
    throw new Error('Failed to generate response');
  }
}
