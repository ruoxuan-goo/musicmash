require("dotenv").config();

// Create service client module using ES6 syntax.
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const REGION = "ap-southeast-2"; // For example, "us-east-1".

const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const sessionToken = process.env.SESSION_TOKEN;

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    sessionToken: sessionToken,
  },
});
module.exports = { ddbClient };
