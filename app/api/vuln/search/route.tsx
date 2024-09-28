import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse<any>) {
  const { searchBy, searchQuery } = await new Response(req.body).json();

  try {
    let data = {};
    if (searchBy.toLowerCase() === "cve") {
      const result = await fetch(`https://cvedb.shodan.io/cve/${searchQuery}`);
      data = await result.json();
    } else {
      const result = await fetch(
        `https://cvedb.shodan.io/cves?${searchBy}=${searchQuery}&count=false&is_kev=false&sort_by_epss=false&skip=0&limit=1000`
      );
      data = await result.json();
    }
    console.log(data);

    return NextResponse.json({ body: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error_message: error }, { status: 400 });
  }
}
