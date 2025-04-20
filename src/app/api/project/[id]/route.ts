import { Project } from "@/models/Project";
import cloudinary from "@/utils/cloudinary.config";
import { connectDB } from "@/utils/mongoose";
import { HttpStatusCode } from "axios";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const { id } = await params;

  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid project ID" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: HttpStatusCode.NotFound }
      );
    }

    return NextResponse.json(project, { status: HttpStatusCode.Ok });
  } catch (error) {
    console.error("GET /api/project/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  const { id } = await params;
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid project ID" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const data = await req.json();

    const updated = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: HttpStatusCode.NotFound }
      );
    }

    return NextResponse.json(updated, { status: HttpStatusCode.Ok });
  } catch (error) {
    console.error("PUT /api/project/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

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

export async function DELETE(req: NextRequest, { params }: any) {
  const { id } = await params;
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid project ID" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: HttpStatusCode.NotFound }
      );
    }

    const publicId = extractPublicIdFromUrl(project.imageURL);

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    } else {
      console.error("Public ID not found, skipping Cloudinary deletion");
    }

    await Project.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    console.error("DELETE /api/project/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
