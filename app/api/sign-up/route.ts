import { docClient } from "@/aws/config";
const { createHash } = require("crypto");
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

function hash_password(value: string) {
  return createHash("sha256")
    .update(value + process.env.DYNAMODB_SALT)
    .digest("hex");
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { req_email, req_password, req_username, req_firstName, req_lastName } =
    await new Response(req.body).json();

  var userCreationParams = {
    RequestItems: {
      users: [
        {
          PutRequest: {
            Item: {
              "Prim Key": hash_password(req_password),
              email: req_email,
              first_name: req_firstName,
              last_name: req_lastName,
              password: hash_password(req_password),
              username: req_username,
            },
          },
        },
      ],
    },
  };

  async function createUser() {
    return new Promise((resolve, reject) => {
      docClient.batchWrite(
        userCreationParams,
        function (error: any, data: any) {
          if (error) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  const result = await createUser();
  if (result) {
    return NextResponse.json({ message: "success" }, { status: 200 });
  } else {
    return NextResponse.json(
      {
        message: "[-] Failed To Create User",
      },
      { status: 400 }
    );
  }
}
