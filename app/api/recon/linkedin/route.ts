import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// interface ResponseData {

// }

export async function POST(req: NextApiRequest, res: NextApiResponse<any>) {
  const { queryParam, searchValue } = await new Response(req.body).json();

  console.log(queryParam, searchValue);

  const url = `https://linkedin-data-api.p.rapidapi.com/search-people?${queryParam}=${searchValue}`;

  const requestHeader: HeadersInit = new Headers();
  requestHeader.set("x-rapidapi-key", process.env.RAPID_API_KEY || "");
  requestHeader.set("x-rapidapi-host", "linkedin-data-api.p.rapidapi.com");
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
