import { S3Client } from "@aws-sdk/client-s3";
export const s3Config = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.S3_BUCKET_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY || "",
  },
});
