import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});





// require('dotenv').config();

// const express = require('express');
// const sql = require('mssql');
// const cors= require('cors');

// const app = express();
// app.use(cors());

// const config = {
//     user: process.env.SQL_USER,         
//     password: process.env.SQL_PASSWORD, 
//     server: process.env.SQL_SERVER,  
//     database: process.env.SQL_DATABASE,
//     options:{
//         trustServerCertificate: true,
//         trustedConnection: false,
//         enableArithAbort: true,
//     },
//     port: 1444
// }

// app.get('/',(req,res)=>{
//     return res.json("Hello World");
// })

// app.get('/tasks', async (req,res)=>{
//     try{
//         const pool = await sql.connect(config);
//         const data = pool.request().query("SELECT * FROM Tasks");
//         data.then(result => {
//             return res.json(result);
//         })
//     }catch(err){
//         return res.status(500).json(err);
//     }
//     console.log(res)
// })

// app.listen(8080, () => console.log(`Server is running`) );





