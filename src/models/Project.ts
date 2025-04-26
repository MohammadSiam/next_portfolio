import { Document, model, models, Schema } from "mongoose";

export interface IProject extends Document {
  _id: string;
  title: string;
  description: string;
  client: string;
  completionTime: string;
  technologies: string;
  imageURL: string;
  demo: string;
  github: string;
  status: "active" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: String, required: true },
    completionTime: { type: String, required: true },
    technologies: { type: String, required: true },
    imageURL: { type: String, required: true },
    demo: { type: String },
    github: { type: String },
    status: { type: String, enum: ["active", "archived"], default: "active" },
  },
  { timestamps: true }
);

export const Project =
  models.Project || model<IProject>("Project", ProjectSchema);
