const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { getItem, updateItem } = require("./dynamo/dynamo");
const musicRouter = require("./routes/music");

const app = express();
const port = 3000;

app.use(cors());
app.use(cookieParser());
// Serve out any static assets correctly
app.use(express.static("../client/build"));

app.use("/search", musicRouter);

app.post("/visitorcount", async (req, res) => {
  try {
    const currentCount = await getItem();

    if (currentCount === undefined || currentCount === null) {
      throw "Fail to get count";
    } else {
      const newCount = currentCount + 1;
      updateItem(JSON.stringify(newCount));
      if (newCount === null || newCount === undefined) {
        throw "Fail to update count";
      }
      return res.json(JSON.stringify(newCount));
    }
  } catch (err) {
    return res.status(404).json({
      error: true,
      message: err,
    });
  }
});

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Musicmash listening at http://localhost:${port}`);
});
