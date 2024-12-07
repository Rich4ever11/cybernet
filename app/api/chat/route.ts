import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { pool } from "@/postgres/database";

export const handleChatCreation = async (
  user_id: string,
  document_id: string,
  user_question: string,
  model_response: string,
  model_version: string,
  created_at: number
) => {
  const insertQuery = `
        INSERT INTO chat (user_id, document_id, user_question, model_response, model_version, created_at) VALUES($1, $2, $3, $4, $5, $6)
    `;

  const values = [
    user_id,
    document_id,
    user_question,
    model_response,
    model_version,
    created_at,
  ];

  const result = await pool.query(insertQuery, values);
  return result;
};

export async function POST(req: any, res: any) {
  const {
    user_id,
    document_id,
    user_question,
    model_response,
    model_version,
    created_at,
  } = await new Response(req.body).json();

  try {
    const response = await handleChatCreation(
      user_id,
      document_id,
      user_question,
      model_response,
      model_version,
      created_at
    );

    return NextResponse.json({ body: "success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}

export async function GET(req: any, res: NextApiResponse<any>) {
  const user_id = req.nextUrl.searchParams.get("id");
  const document_key = req.nextUrl.searchParams.get("document_key");

  try {
    const getQuery = `
          SELECT *
          FROM chat
          WHERE user_id = $1 AND document_id = $2
          ORDER BY created_at
      `;

    const values = [user_id, document_key];

    const result = await pool.query(getQuery, values);
    // time: answerTimeInSeconds,
    // content: aiAnswer,
    // name: "Cybernet AI",
    // role: "assistant",
    const conversation = result.rows.flatMap((chat_object: any) => [
      {
        time: chat_object.created_at,
        content: chat_object.user_question,
        role: "user",
        name: "user",
      },
      {
        time: chat_object.created_at,
        content: chat_object.model_response,
        role: "assistant",
        name: "Cybernet AI",
      },
    ]);
    return NextResponse.json({ body: conversation }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
