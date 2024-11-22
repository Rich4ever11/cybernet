import { RetrieveAndGenerateCommand } from "@aws-sdk/client-bedrock-agent-runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { bedrockClient } from "@/aws/bedrock-config";

type ResponseData = {
  message: string;
};

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { question, document_key } = await new Response(req.body).json();

    const retrieveAndGen = await new RetrieveAndGenerateCommand({
      input: { text: question },
      retrieveAndGenerateConfiguration: {
        type: "KNOWLEDGE_BASE",
        knowledgeBaseConfiguration: {
          knowledgeBaseId: "P7WKAZSZRX",
          modelArn:
            "arn:aws:bedrock:us-east-1:219023173602:inference-profile/us.meta.llama3-1-70b-instruct-v1:0",

          retrievalConfiguration: {
            // KnowledgeBaseRetrievalConfiguration
            vectorSearchConfiguration: {
              // KnowledgeBaseVectorSearchConfiguration
              filter: {
                // RetrievalFilter Union: only one key present
                equals: {
                  // FilterAttribute
                  key: "x-amz-bedrock-kb-source-uri", // required
                  value: `${process.env.S3_PATH}${document_key}`, // required
                },
              },
            },
          },
        },
      },
    });

    const { citations, output } = await bedrockClient.send(retrieveAndGen);
    if (output) {
      return NextResponse.json({ message: output }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid Output" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error Sending Request" },
      { status: 400 }
    );
  }
}
