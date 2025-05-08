const express = require("express");
const cases = require("./cases");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("views", `${__dirname}`);
app.set("viewengine", "pug");

app.get("/", (req, res) => {
  res.render("./form.pug");
});

app.post("/login", (req, res) => {
  const body = req.body;
  res.type("text/plain");
  res.send(`username: ${body.username}\npassword: ${body.password}`);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
