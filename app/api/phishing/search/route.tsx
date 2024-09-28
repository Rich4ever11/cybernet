import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse<any>) {
  const { phishingLink } = await new Response(req.body).json();
  const requestHeader: HeadersInit = new Headers();
  requestHeader.set("Content-Type", "application/json");

  const req_data = { url: phishingLink, format: "json" };

  try {
    const result = await fetch(`https://checkurl.phishtank.com/checkurl/`, {
      method: "POST",
      headers: requestHeader,
      body: JSON.stringify(req_data),
    });
    const data = await result.json();
    return NextResponse.json({ body: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
