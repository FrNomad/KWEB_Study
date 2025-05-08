const express = require("express");
const cases = require("./cases");

const app = express();
const port = 3000;

app.get("/factorial", (req, res) => {
  const query = req.query;
  res.redirect(`/factorial/${query.number}`);
});

app.get("/factorial/:number", (req, res) => {
  const number = parseInt(req.params.number);
  res.type("text/plain");
  if (!isNaN(number)) {
    res.send(cases.factorial(number));
  } else {
    res.send("NaN");
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
