import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
    },
};


const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log("Connected to MSSQL database");
    } catch (err) {
        console.error("Database connection failed", err);
        process.exit(1);
    }
};

export { connectDB, sql };
