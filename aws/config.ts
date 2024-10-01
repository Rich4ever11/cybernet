const AWS = require("aws-sdk");
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
});
export const docClient = new AWS.DynamoDB.DocumentClient();
