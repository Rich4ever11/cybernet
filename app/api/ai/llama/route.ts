import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const inference = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function POST(req: NextApiRequest, _: NextApiResponse) {
  const { question } = await new Response(req.body).json();

  const result = await inference.chatCompletion({
    model: "mistralai/Mistral-Nemo-Instruct-2407",
    messages: [{ role: "user", content: question }],
    max_tokens: 500,
  });
  return NextResponse.json(
    { body: result.choices[0].message },
    { status: 200 }
  );
}
