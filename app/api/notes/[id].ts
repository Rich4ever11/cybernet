import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { pool } from "@/postgres/database";

export async function GET(req: any, res: NextApiResponse<any>) {
  const { id } = req.query;
  console.log(id);

  try {
    // const getQuery = `
    //       SELECT *
    //       FROM notes
    //       WHERE user_id = $1
    //   `;

    // const values = [user_id];

    // const result = await pool.query(getQuery, values);
    return NextResponse.json({ body: [] }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
