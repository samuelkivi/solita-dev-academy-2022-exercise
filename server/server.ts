import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import cors from 'cors';
import {router} from "./router";

//var cors = require('cors')
const app = express();
app.use(cors())
dotenv.config();

app.use(bodyParser.json());
app.use("/farm", router);

app.listen(process.env.PORT, () => {
    console.log("Node server started running");
});