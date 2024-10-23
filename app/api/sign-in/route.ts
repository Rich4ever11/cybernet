import { docClient } from "@/aws/config";
import { createHash } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

function hash_password(value: string) {
  return createHash("sha256")
    .update(value + process.env.DYNAMODB_SALT)
    .digest("hex");
}

type ResponseData = {
  message: string;
};

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { req_username, req_password } = await new Response(req.body).json();

  const authUserParams = {
    RequestItems: {
      users: {
        Keys: [
          {
            "Prim Key": hash_password(req_password),
          },
        ],
      },
    },
  };

  async function authenticateUser() {
    return new Promise((resolve, reject) => {
      docClient.batchGet(authUserParams, function (error: any, data: any) {
        if (error) {
          resolve(error);
        } else {
          const response = data.Responses;
          const user = response.users[0];
          if (user) {
            const { password, username } = user;
            if (
              password === hash_password(req_password) &&
              username === req_username
            ) {
              resolve(user);
            } else {
              resolve(error);
            }
          } else {
            resolve(error);
          }
        }
      });
    });
  }

  const result: any = await authenticateUser();
  if (result) {
    const data = {
      email: result?.email,
      first_name: result?.first_name,
      last_name: result?.last_name,
      username: result?.username,
      id: result?.id,
    };
    if (data.username === req_username) {
      return NextResponse.json({ body: data }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No Users Found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "No Users Found" }, { status: 404 });
  }
}
