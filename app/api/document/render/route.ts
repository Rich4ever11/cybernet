import { s3Config } from "@/aws/s3config";
import { createHash } from "crypto";
import { GetObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { DateTime } from "aws-sdk/clients/devicefarm";

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

export async function GET(req: any, res: NextApiResponse<ResponseData>) {
  try {
    const userRequest = req.nextUrl.searchParams;
    const userId = userRequest.get("id");
    const command = new ListObjectsCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Delimiter: "/",
      Prefix: `${userId}/`,
    });
    const response = await s3Config.send(command);
    const fileMetadataList: any = response.Contents || [];
    const returnValue = fileMetadataList
      .filter((fileMetaData: FileMetaData) => {
        return fileMetaData.Size > 0;
      })
      .map((fileMetaData: FileMetaData) => {
        return {
          Key: fileMetaData.Key,
          LastModified: fileMetaData.LastModified,
          ETag: fileMetaData.ETag,
          Size: fileMetaData.Size,
          StorageClass: fileMetaData.StorageClass,
        };
      });
    return NextResponse.json({ data: returnValue }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}

export async function POST(req: any, res: NextApiResponse<ResponseData>) {
  try {
    const { documentKey } = await new Response(req.body).json();
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: documentKey,
    });
    const response = await s3Config.send(command);
    const fileMetadataList = response;
    const byteArray = await fileMetadataList.Body?.transformToByteArray();
    const fileMetaData = {
      contentType: fileMetadataList.ContentType,
      expiration: fileMetadataList.Expiration,
      lastModified: fileMetadataList.LastModified,
      contentLength: fileMetadataList.ContentLength,
      encryption: fileMetadataList.ServerSideEncryption,
    };
    return NextResponse.json(
      { data: byteArray, metadata: fileMetaData },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
