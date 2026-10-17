
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json(
        { message: "Please select an image file." },
        { status: 400 }
      );
    }

    const extension = ALLOWED_TYPES[file.type];

    if (!extension) {
      return NextResponse.json(
        { message: "Unsupported image format." },
        { status: 415 }
      );
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "Image must be between 1 byte and 5 MB." },
        { status: 413 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    // Basic file-signature checks; MIME type alone is not trusted.
    const validSignature =
      (file.type === "image/jpeg" &&
        bytes.length >= 3 &&
        bytes[0] === 0xff &&
        bytes[1] === 0xd8 &&
        bytes[2] === 0xff) ||
      (file.type === "image/png" &&
        bytes.length >= 8 &&
        bytes.subarray(0, 8).equals(
          Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
        )) ||
      (file.type === "image/webp" &&
        bytes.length >= 12 &&
        bytes.toString("ascii", 0, 4) === "RIFF" &&
        bytes.toString("ascii", 8, 12) === "WEBP") ||
      (file.type === "image/gif" &&
        bytes.length >= 6 &&
        ["GIF87a", "GIF89a"].includes(
          bytes.toString("ascii", 0, 6)
        ));

    if (!validSignature) {
      return NextResponse.json(
        { message: "The file does not appear to be a valid image." },
        { status: 415 }
      );
    }

    const filename = `${randomUUID()}${extension}`;
    const imagesDirectory = path.join(
      process.cwd(),
      "public",
      "images"
    );

    await mkdir(imagesDirectory, { recursive: true });

    const destination = path.join(imagesDirectory, filename);

    await writeFile(destination, bytes, { flag: "wx" });

    return NextResponse.json(
      {
        success: true,
        url: `/images/${filename}`,
        filename,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Image upload API error:", error);

    return NextResponse.json(
      { message: "Unable to upload the image." },
      { status: 500 }
    );
  }
}
