import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  company: { type: String, default: '-' },
  course: { type: String, required: true },
  details: { type: String, default: '' },
  imageUrl: { type: String, required: true },
  cloudinaryPublicId: { type: String, required: true },
  certificationType: { type: String, default: 'Certified Enterprise AI Architect' },
  issuedDate: { type: Date, default: Date.now },
}, { timestamps: true });

// Create a compound unique index to ensure one certificate type per email
certificateSchema.index({ email: 1, certificationType: 1 }, { unique: true });

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;