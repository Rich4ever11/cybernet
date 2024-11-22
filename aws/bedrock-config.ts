import { BedrockAgentRuntimeClient } from "@aws-sdk/client-bedrock-agent-runtime";
export const bedrockClient = new BedrockAgentRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.BEDROCK_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.BEDROCK_SECRET_ACCESS_KEY || "",
  },
});
