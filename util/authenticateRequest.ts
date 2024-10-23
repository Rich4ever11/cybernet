import { docClient } from "@/aws/config";

export async function verifyActiveUser(userId: string) {
  docClient.scan();
  const params = {
    TableName: "users",
  };

  const items = await docClient.scan(params).promise();
  for (let i = 0; i < items.Items.length; i++) {
    if (items.Items[i].id === userId) {
      return true;
    }
  }
  return false;
}
