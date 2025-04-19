import { Project } from "@/models/Project";
import { connectDB } from "@/utils/mongoose";
import { HttpStatusCode } from "axios"; // optional for better readability
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    if (projects.length === 0) {
      return NextResponse.json(
        { message: "No Projects found" },
        { status: HttpStatusCode.NotFound }
      );
    }
    return NextResponse.json(projects, { status: HttpStatusCode.Ok });
  } catch (error) {
    console.error("GET /api/project error:", error);
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const createdProject = await Project.create(body);
    console.log(createdProject, "body");

    return NextResponse.json(createdProject, {
      status: HttpStatusCode.Created,
    });
  } catch (error) {
    console.error("POST /api/project error:", error);
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
