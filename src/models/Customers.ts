import { Schema, model, Document } from 'mongoose';

// ICustomer defines the shape of one document in the "customers" collection.
// Extending Document gives us Mongoose built-ins like .save(), ._id, etc.
export interface ICustomer extends Document {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  whatsappId: string; // the sender's WhatsApp ID (e.g. "972501234567@c.us")
  createdAt: Date;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    name:        { type: String, required: true, trim: true },
    phone:       { type: String, required: true, trim: true },
    email:       { type: String, required: true, trim: true, lowercase: true },
    serviceType: { type: String, required: true, trim: true },
    // We store the WhatsApp ID so we can look up past customers later if needed
    whatsappId:  { type: String, required: true },
  },
  {
    // timestamps: true tells Mongoose to automatically add createdAt & updatedAt fields
    timestamps: true,
  }
);

// model<ICustomer>() creates (or reuses) a Mongoose model bound to the "customers" collection
export const Customer = model<ICustomer>('Customer', CustomerSchema);
