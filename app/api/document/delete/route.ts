import { s3Config } from "@/aws/s3config";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function DELETE(req: any, res: any) {
  try {
    const { documentKey } = await new Response(req.body).json();
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: documentKey,
    });
    const response = await s3Config.send(command);
    return NextResponse.json(
      { message: "deletion succeeded" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
