import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse<any>) {
  const { host, ports } = await new Response(req.body).json();

  const url = `http://localhost:5000/nmap`;
  const requestHeader: HeadersInit = new Headers();
  requestHeader.set("Content-Type", "application/json");
  const data = {
    host: host,
    ports: ports,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: requestHeader,
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return NextResponse.json({ body: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}