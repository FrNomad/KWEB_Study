require("dotenv").config();
const express = require("express");
const mysql2 = require("mysql2/promise");

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
});

const runQuery = async (sql) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(sql);
    return { result: result };
  } catch (error) {
    console.error(error);
    return { error: true };
  } finally {
    conn.release();
  }
};

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/fare", async (req, res) => {
  const uid = req.query.uid;
  const sql =
    "SELECT `users`.`name`, Sum(`fares`.`fare`) as `total_fare` " +
    "FROM `tickets` INNER JOIN ( " +
    "SELECT `trains`.`id`, " +
    "Round(`types`.`fare_rate` * `trains`.`distance` / 100000) * 100 AS `fare` " +
    "FROM `trains` " +
    "INNER JOIN `types` ON `trains`.`type` = `types`.`id` " +
    ") AS `fares` " +
    "ON `tickets`.`train` = `fares`.`id` " +
    "INNER JOIN `users` ON `tickets`.`user` = `users`.`id` " +
    `WHERE \`tickets\`.\`user\` = ${uid} ` +
    "GROUP BY `tickets`.`user`;";

  const result = await runQuery(sql);

  if (result.error) {
    res.status(505).send();
  } else {
    const data = result.result[0];
    res.send(`Total fare of ${data.name} is ${data.total_fare} KRW.`);
  }
});

app.get("/train/status", async (req, res) => {
  const tid = req.query.tid;
  const sql =
    "SELECT `trains`.`id`, " +
    "Count(`tickets`.`id`) AS `occupied`, " +
    "`types`.`max_seats` AS `maximum` " +
    "FROM `tickets` " +
    "RIGHT OUTER JOIN `trains` ON `tickets`.`train` = `trains`.`id` " +
    "INNER JOIN `types` ON `trains`.`type` = `types`.`id` " +
    `WHERE \`trains\`.\`id\` = ${tid} ` +
    "GROUP BY `trains`.`id`;";

  const result = await runQuery(sql);

  if (result.error) {
    res.status(505).send();
  } else {
    const data = result.result[0];
    res.send(
      `Train ${data.id} is${
        data.occupied < data.maximum ? " not" : ""
      } sold out.`
    );
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
