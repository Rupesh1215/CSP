import { z } from "zod";

// Admin Schema
export interface Admin {
  _id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export const insertAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export type InsertAdmin = z.infer<typeof insertAdminSchema>;

// Health Camp Schema
export interface Camp {
  _id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: 'Vaccination' | 'General' | 'Specialty';
  description: string;
  status: 'active' | 'cancelled' | 'upcoming';
  imageUrl?: string;
  lastUpdated: Date;
}

export const insertCampSchema = z.object({
  title: z.string().min(1),
  date: z.string(),
  time: z.string(),
  location: z.string().min(1),
  type: z.enum(['Vaccination', 'General', 'Specialty']),
  description: z.string().min(1),
  status: z.enum(['active', 'cancelled', 'upcoming']),
  imageUrl: z.string().optional(),
});

export type InsertCamp = z.infer<typeof insertCampSchema>;

// Vaccine Schema
export interface Vaccine {
  _id: string;
  name: string;
  ageGroup: string;
  scheduleNotes: string;
  nextDoseInfo: string;
  lastUpdated: Date;
}

export const insertVaccineSchema = z.object({
  name: z.string().min(1),
  ageGroup: z.string().min(1),
  scheduleNotes: z.string().min(1),
  nextDoseInfo: z.string(),
});

export type InsertVaccine = z.infer<typeof insertVaccineSchema>;

// Government Scheme Schema
export interface Scheme {
  _id: string;
  name: string;
  eligibility: string;
  benefits: string;
  description: string;
  lastUpdated: Date;
}

export const insertSchemeSchema = z.object({
  name: z.string().min(1),
  eligibility: z.string().min(1),
  benefits: z.string().min(1),
  description: z.string().min(1),
});

export type InsertScheme = z.infer<typeof insertSchemeSchema>;

// Audit Log Schema
export interface AuditLog {
  _id: string;
  adminId: string;
  adminEmail: string;
  action: string;
  entityType: 'camp' | 'vaccine' | 'scheme';
  entityId: string;
  timestamp: Date;
  details: string;
}

// FAQ Query/Response
export interface FAQQuery {
  query: string;
  language: 'en' | 'hi' | 'te';
}

export interface FAQResponse {
  answer: string;
  sources: Array<{
    type: 'camp' | 'vaccine' | 'scheme';
    id: string;
    title: string;
  }>;
  outOfScope: boolean;
}

// Auth Response
export interface AuthResponse {
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
  };
}
