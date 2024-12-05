import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { pool } from "@/postgres/database";

export async function POST(req: any, res: any) {
  const { chat_id, note_contents, timestamp } = await new Response(
    req.body
  ).json();
  console.log(chat_id, note_contents, timestamp);

  try {
    const insertQuery = `
        INSERT INTO notes_ai (chat_id, note_content, created_at) VALUES($1, $2, $3)
    `;

    const values = [chat_id, note_contents, timestamp];

    const result = await pool.query(insertQuery, values);
    return NextResponse.json({ body: "success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}

export async function PUT(req: any, res: NextApiResponse<any>) {
  const { note_contents, chat_id, note_id } = await new Response(
    req.body
  ).json();

  try {
    const getQuery = `UPDATE notes_ai SET note_content = $1 WHERE id = $2 AND chat_id = $3;`;
    const values = [note_contents, note_id, chat_id];

    const result = await pool.query(getQuery, values);
    return NextResponse.json({ body: result.rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}

export async function GET(req: any, res: NextApiResponse<any>) {
  const user_id = req.nextUrl.searchParams.get("id");

  try {
    const getQuery = `
          SELECT chat.id as chat_id,
                  notes_ai.id as note_id,
                  notes_ai.created_at as note_created_at, 
                  chat.created_at as chat_created_at, 
                  note_content, 
                  document_id, 
                  user_question, 
                  model_response, 
                  model_version
          FROM chat
          LEFT JOIN notes_ai ON notes_ai.chat_id = chat.id
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
