import { RetrieveAndGenerateCommand } from "@aws-sdk/client-bedrock-agent-runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { bedrockClient } from "@/aws/bedrock-config";
import { handleChatCreation } from "@/app/api/chat/route";

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
          knowledgeBaseId: process.env.BEDROCK_KNOWLEDGE_BASE_ID,
          modelArn: process.env.BEDROCK_MODEL,

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
      const user_id = document_key.split("/")[0];
      const created_at = new Date().getTime() / 1000;
      const result = await handleChatCreation(
        user_id,
        document_key,
        question,
        output.text || "RESPONSE NOT FOUND",
        process.env.BEDROCK_MODEL || "",
        created_at
      );
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
