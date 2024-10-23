import { s3Config } from "@/aws/s3config";
import { createHash } from "crypto";
import {
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { verifyActiveUser } from "@/util/authenticateRequest";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { DateTime } from "aws-sdk/clients/devicefarm";
import { Stream } from "stream";

type ResponseData = {
  message: string;
};

interface FileMetaData {
  Key: string;
  LastModified: DateTime;
  ETag: string;
  Size: number;
  StorageClass: string;
  Owner: {
    DisplayName: string;
    ID: string;
  };
}

async function stream2buffer(stream: any) {
  try {
    const chunks = [];
    for await (let chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  } catch {
    return Buffer.concat([]);
  }
}

export async function POST(req: any, res: NextApiResponse<ResponseData>) {
  try {
    const userRequest = req.nextUrl.searchParams;
    const filename = userRequest.get("file");
    const userId = userRequest.get("id");
    const contentType = userRequest.get("contentType");
    const base64 = await stream2buffer(req.body);
    const verifyUser = await verifyActiveUser(userId);

    //add a security measure to prevent any user from upload
    if (base64 && filename && userId && verifyUser) {
      const SavePath = `${userId}/${filename}`;
      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: SavePath,
        Body: base64,
        ContentEncoding: "base64", // required
        ContentType: contentType,
      });
      const response = await s3Config.send(command);

      return NextResponse.json(
        { message: "[+} File Successfully Added" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error_message: "NOT FOUND" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
