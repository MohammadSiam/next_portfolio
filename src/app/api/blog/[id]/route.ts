import { Blog } from "@/models/Blog";
import cloudinary from "@/utils/cloudinary.config";
import { toDataUri } from "@/utils/dataURIParser";
import { connectDB } from "@/utils/mongoose";
import { HttpStatusCode } from "axios";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

function extractPublicIdFromUrl(url: string): string | null {
  try {
    const parts = url.split("/upload/")[1];
    const withoutVersion = parts.split("/")[1];
    const publicId = withoutVersion.replace(/\.[^/.]+$/, "");
    return publicId;
  } catch (e) {
    console.error("Failed to extract public_id from URL:", e);
    return null;
  }
}

export async function GET(req: NextRequest, { params }: any) {
  const { id } = params;

  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid blog ID" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: HttpStatusCode.NotFound }
      );
    }

    return NextResponse.json(blog, { status: HttpStatusCode.Ok });
  } catch (error) {
    console.error("GET /api/blog/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  const { id } = params;

  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid blog ID" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: HttpStatusCode.NotFound }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tags = formData.get("tags") as string; // Expected comma-separated
    const image = formData.get("blogImageURL");

    let updatedFields: any = {
      title,
      description,
      blogTags: tags.split(",").map((tag) => ({ name: tag.trim() })),
    };

    if (image && typeof image !== "string") {
      const publicId = extractPublicIdFromUrl(blog.blogImageURL);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      const arrayBuffer = await (image as File).arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const dataURI: any = toDataUri(buffer, image.name);

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(dataURI, (error: any, result: any) => {
          if (error) reject(error);
          resolve(result);
        });
      });

      updatedFields.blogImageURL = uploadResult.url;
    }

    const updated = await Blog.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    return NextResponse.json(updated, { status: HttpStatusCode.Ok });
  } catch (error) {
    console.error("PUT /api/blog/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  const { id } = params;

  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid blog ID" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: HttpStatusCode.NotFound }
      );
    }

    const publicId = extractPublicIdFromUrl(blog.blogImageURL);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    console.error("DELETE /api/blog/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
