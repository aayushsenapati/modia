import express from "express";
import cors from "cors";
import id_play from "./api/ids.route.js"
const app = express();
//require("dotenv").config({ path: "./config.env" });
const port = 5000;
app.use(cors());
app.use(express.json());
app.use("/idplay",id_play)
app.use("*",(req, res)=>res.status(404).json({error:"not found"}))


export default app