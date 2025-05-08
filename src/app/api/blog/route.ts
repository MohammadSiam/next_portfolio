import { Blog } from "@/models/Blog";
import cloudinary from "@/utils/cloudinary.config";
import { toDataUri } from "@/utils/dataURIParser";
import { connectDB } from "@/utils/mongoose";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });

    if (blogs.length === 0) {
      return NextResponse.json(
        { message: "No blogs found" },
        { status: HttpStatusCode.NotFound }
      );
    }

    return NextResponse.json(blogs, { status: HttpStatusCode.Ok });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const subTitle = formData.get("subTitle") as string;
    const description = formData.get("description") as string;
    const tags = formData.get("tags") as string;
    const image = formData.get("blogImageURL") as unknown as File;

    if (!title || !description || !tags || !image) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const imageBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    const dataURI: any = toDataUri(buffer, image.name);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(dataURI, (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      });
    });

    const newBlog = await Blog.create({
      title,
      subTitle,
      description,
      blogTags: tags.split(",").map((tag) => ({ name: tag.trim() })),
      blogImageURL: uploadResult.url,
    });

    return NextResponse.json(newBlog, { status: HttpStatusCode.Created });
  } catch (error) {
    console.error("POST /api/blog error:", error);
    return NextResponse.json(
      { message: "Failed to create blog" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
