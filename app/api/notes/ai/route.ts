import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { pool } from "@/postgres/database";

export async function POST(req: any, res: any) {
  const { chat_id, timestamp } = await new Response(req.body).json();
  const note_contents = "";

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
