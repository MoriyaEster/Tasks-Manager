import dotenv from "dotenv";
import app from "./app.js";
import db from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT;

db.raw('SELECT 1') 
  .then(() => {
    console.log("Connected to MSSQL with Knex");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
