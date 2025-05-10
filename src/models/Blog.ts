import { Document, model, models, Schema } from "mongoose";

export interface IBlogTags {
  name: string;
}

export interface IBlog extends Document {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  blogTags: IBlogTags[];
  blogImageURL: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    blogTags: [
      {
        name: { type: String, required: true },
      },
    ],
    blogImageURL: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
