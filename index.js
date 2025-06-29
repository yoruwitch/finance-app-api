import "dotenv/config.js";
import e from "express";

import { PostgresHelper } from "./src/db/postgres/helper.js";

const app = e();

app.get("/", async (req, res) => {
    const results = await PostgresHelper.query("SELECT * FROM users");
    res.send(JSON.stringify(results));
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
