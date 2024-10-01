import { s3Config } from "@/aws/s3config";
import { createHash } from "crypto";
import { GetObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { DateTime } from "aws-sdk/clients/devicefarm";

// for (let i = 0; i < fileList.length; i++) {
//   const objectKey = fileList[i].Key;
//   if (objectKey[objectKey.length - 1] !== "/") {
//     const getFileCommand = new GetObjectCommand({
//       Bucket: "cybernet-ai-docs",
//       Key: objectKey,
//     });
//     const response = await s3Config.send(getFileCommand);
//     const byteArray = await response.Body?.transformToByteArray();
//     const fileType = response.ContentType;
//     console.log(fileType);
//     console.log(byteArray);
//   }
// }

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

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const command = new ListObjectsCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Delimiter: "/",
      Prefix: "cybernet-documents/",
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
        };
      });
    return NextResponse.json({ data: returnValue }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
