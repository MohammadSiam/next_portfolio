// models/Project.ts
import { Document, model, models, Schema } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  status: "active" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["active", "archived"], default: "active" },
  },
  { timestamps: true }
);

export const Project =
  models.Project || model<IProject>("Project", ProjectSchema);
