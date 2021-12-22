import mysql from "mysql2";
import * as dotenv from "dotenv";
import { OkPacket, RowDataPacket } from "mysql2";
import { DataPoint } from "./farm";

dotenv.config();

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

//var location = "testi"
//var date = "testi"
//var sensorType = "testi"
//var value = 1234

export const insertIntoFarms = (datapoint: DataPoint, callback: Function) => {
    //"INSERT INTO farms VALUES (%s, %s, %s, %s)"
    const queryString = "INSERT INTO farms VALUES (?, ?, ?,?)"
    
    db.query(
      queryString,
      [datapoint.location, datapoint.date, datapoint.sensorType, datapoint.value],
      (err, result) => {
        if (err) {callback(err)};
  
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
  };