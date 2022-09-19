const { ddbDocClient } = require("./db-doc");
const { GetCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
require("dotenv").config();

let table_name = process.env.TABLENAME;
let qut_user_name = process.env.QUTUSERNAME;

// get count from table
const getItem = async () => {
  try {
    const params = {
      TableName: table_name,
      Key: {
        "qut-username": qut_user_name,
      },
    };
    const data = await ddbDocClient.send(new GetCommand(params));
    console.log("Visitor count:", data.Item.count);
    return parseInt(data.Item.count);
  } catch (err) {
    console.log(err);
  }
};

// update count
const updateItem = async (c) => {
  // Set the parameters
  const params = {
    TableName: table_name,
    Key: {
      "qut-username": qut_user_name,
    },
    ProjectionExpression: "#count",
    ExpressionAttributeNames: { "#count": "count" },
    UpdateExpression: "set #count = :c",
    ExpressionAttributeValues: {
      ":c": c,
    },
  };
  try {
    const data = await ddbDocClient.send(new UpdateCommand(params));
    console.log("Visitor count updated to: " + c);
    return data;
  } catch (err) {
    console.log(err);
  }
};

exports.getItem = getItem;
exports.updateItem = updateItem;
