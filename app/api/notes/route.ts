import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { pool } from "@/postgres/database";

export async function POST(req: NextApiRequest, res: NextApiResponse<any>) {
  const { documentKey, note_contents, timestamp, user_id } = await new Response(
    req.body
  ).json();

  try {
    const insertQuery = `
        INSERT INTO notes (user_id, document_key, content, timestamp) VALUES($1, $2, $3, $4)
    `;

    const values = [user_id, documentKey, note_contents, timestamp];

    const result = await pool.query(insertQuery, values);
    return NextResponse.json({ body: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
