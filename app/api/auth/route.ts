const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
});
const docClient = new AWS.DynamoDB.DocumentClient();

import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const authUserParams = {
    RequestItems: {
      users: {
        Keys: [
          {
            "Prim Key": "0",
          },
        ],
      },
    },
  };

  docClient.batchGet(authUserParams, function (error: any, data: any) {
    if (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to obtain user info",
        },
        { status: 400 }
      );
    } else {
      const users = data.Responses;
      console.log(data);
      console.log(users);
    }
  });
  return NextResponse.json({ message: "Hello from Next.js!" }, { status: 200 });
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { req_email, req_password } = req.body;

  const authUserParams = {
    RequestItems: {
      users: {
        Keys: [
          {
            "Prim Key": password,
          },
        ],
      },
    },
  };

  docClient.batchGet(authUserParams, function (error: any, data: any) {
    if (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Authentication Failed",
        },
        { status: 400 }
      );
    } else {
      const response = data.Responses;
      const user = response.users[0];
      const { password, email } = user;
      if (password === req_password && email === req_email) {
        return NextResponse.json(
          { message: "User Authenticated" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "User Not Found" },
          { status: 404 }
        );
      }
    }
  });
  return NextResponse.json(
    { message: "Failed to Authenticate User" },
    { status: 400 }
  );
}
