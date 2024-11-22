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

  try {
    const getQuery = `
          SELECT *
          FROM notes_ai
          WHERE user_id = $1
      `;

    const values = [user_id];

    const result = await pool.query(getQuery, values);
    return NextResponse.json({ body: result.rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
