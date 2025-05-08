const express = require("express");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const parseObject = (obj, res) => {
  res.type("text/plain");
  res.send(
    Object.keys(obj)
      .map((k) => `${k}: ${obj[k]}`)
      .join("\n")
  );
};

app.get("/", (req, res) => {
  parseObject(req.query, res);
});

app.post("/", (req, res) => {
  parseObject(req.body, res);
});

app.put("/", (req, res) => {
  parseObject(req.body, res);
});

app.delete("/", (req, res) => {
  parseObject(req.body, res);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
