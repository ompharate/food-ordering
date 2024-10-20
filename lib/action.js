"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    },
  });
  
 export async function generateUrl(filename, filetype) {
  console.log(filename,filetype)

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3,
      Key: filename,
      ContentType: filetype,
    });
  
    const url = await getSignedUrl(s3Client, command);
    return url;
  }