import { Project } from "@/models/Project";
import cloudinary from "@/utils/cloudinary.config";
import { toDataUri } from "@/utils/dataURIParser";
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

    const body = await req.formData();
    const rawData = body.get("data") as string;
    const image: any = body.get("image") as Blob;
    const imageBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    const dataURI: any = toDataUri(buffer, image.name);
    const parsedData = JSON.parse(rawData);
    const uploadToCloudinary = (dataURI: string) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(dataURI, (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        });
      });
    };
    const uploadResult: any = await uploadToCloudinary(dataURI);
    parsedData.imageURL = uploadResult.url;
    const createdProject = await Project.create(parsedData);

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
