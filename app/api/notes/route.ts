import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { pool } from "@/postgres/database";

export async function POST(req: any, res: any) {
  const { documentKey, note_contents, timestamp, user_id } = await new Response(
    req.body
  ).json();

  try {
    const insertQuery = `
        INSERT INTO notes(user_id, document_key, content, timestamp) VALUES($1, $2, $3, $4)
    `;

    const values = [user_id, documentKey, note_contents, timestamp];

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
          FROM notes
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

export async function PUT(req: any, res: NextApiResponse<any>) {
  const { documentKey, note_id, note_contents, user_id } = await new Response(
    req.body
  ).json();

  try {
    const getQuery = `UPDATE notes SET content = $1 WHERE user_id = $2 AND document_key = $3 AND id = $4;`;
    const values = [note_contents, user_id, documentKey, note_id];

    const result = await pool.query(getQuery, values);
    return NextResponse.json({ body: result.rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}

export async function DELETE(req: any, res: NextApiResponse<any>) {
  const { documentKey, note_id, user_id } = await new Response(req.body).json();

  try {
    const getQuery = `DELETE FROM notes WHERE user_id = $1 AND document_key = $2 AND id = $3;`;
    const values = [user_id, documentKey, note_id];

    const result = await pool.query(getQuery, values);
    return NextResponse.json({ body: result.rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
