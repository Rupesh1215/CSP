import mongoose, { Schema, Document } from 'mongoose';
import type { Admin, Camp, Vaccine, Scheme, AuditLog } from '@shared/schema';

export interface AdminDocument extends Omit<Admin, '_id'>, Document {}
export interface CampDocument extends Omit<Camp, '_id'>, Document {}
export interface VaccineDocument extends Omit<Vaccine, '_id'>, Document {}
export interface SchemeDocument extends Omit<Scheme, '_id'>, Document {}
export interface AuditLogDocument extends Omit<AuditLog, '_id'>, Document {}

const adminSchema = new Schema<AdminDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const campSchema = new Schema<CampDocument>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Vaccination', 'General', 'Specialty'], required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['active', 'cancelled', 'upcoming'], required: true },
  imageUrl: { type: String },
  lastUpdated: { type: Date, default: Date.now }
});

const vaccineSchema = new Schema<VaccineDocument>({
  name: { type: String, required: true },
  ageGroup: { type: String, required: true },
  scheduleNotes: { type: String, required: true },
  nextDoseInfo: { type: String, default: '' },
  lastUpdated: { type: Date, default: Date.now }
});

const schemeSchema = new Schema<SchemeDocument>({
  name: { type: String, required: true },
  eligibility: { type: String, required: true },
  benefits: { type: String, required: true },
  description: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

const auditLogSchema = new Schema<AuditLogDocument>({
  adminId: { type: String, required: true },
  adminEmail: { type: String, required: true },
  action: { type: String, required: true },
  entityType: { type: String, enum: ['camp', 'vaccine', 'scheme'], required: true },
  entityId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: String, required: true }
});

export const AdminModel = mongoose.model<AdminDocument>('Admin', adminSchema);
export const CampModel = mongoose.model<CampDocument>('Camp', campSchema);
export const VaccineModel = mongoose.model<VaccineDocument>('Vaccine', vaccineSchema);
export const SchemeModel = mongoose.model<SchemeDocument>('Scheme', schemeSchema);
export const AuditLogModel = mongoose.model<AuditLogDocument>('AuditLog', auditLogSchema);
