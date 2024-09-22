import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse<any>) {
  const { searchValue } = await new Response(req.body).json();

  console.log(searchValue);

  const url = `https://breachdirectory.p.rapidapi.com/?func=auto&term=${searchValue}`;

  const requestHeader: HeadersInit = new Headers();
  requestHeader.set("x-rapidapi-key", process.env.RAPID_API_KEY || "");
  requestHeader.set("x-rapidapi-host", "breachdirectory.p.rapidapi.com");
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: requestHeader,
    });
    const result = await response.json();
    return NextResponse.json({ body: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
