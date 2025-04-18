import { Project } from "@/models/Project";
import { connectDB } from "@/utils/mongoose";
import { HttpStatusCode } from "axios";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: "Invalid project ID" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const project = await Project.findById(params.id);

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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: "Invalid project ID" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const data = await req.json();

    const updated = await Project.findByIdAndUpdate(params.id, data, {
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

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: "Invalid project ID" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const deleted = await Project.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: HttpStatusCode.NotFound }
      );
    }

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
