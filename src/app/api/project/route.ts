// app/api/project/route.ts

import { Project } from "@/models/Project";
import { connectDB } from "@/utils/mongoose";
import { HttpStatusCode } from "axios"; // optional for better readability
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find().sort({ createdAt: -1 });

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

    if (!body?.name || typeof body.name !== "string") {
      return NextResponse.json(
        { message: "Project name is required and must be a string." },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const createdProject = await Project.create(body);

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
