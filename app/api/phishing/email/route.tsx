import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  const { email } = await new Response(req.body).json();

  try {
    const result = await fetch(`https://emailrep.io/${email}?summary=true`);
    const data = await result.json();
    return NextResponse.json({ body: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
