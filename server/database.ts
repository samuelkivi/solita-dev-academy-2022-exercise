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


export const insertIntoFarms = (datapoint: DataPoint, callback: Function) => {
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

  export const findAll = (callback: Function) => {
    const queryString = "SELECT * FROM farms"
    
    db.query(
      queryString,
      (err, result) => {
        if (err) {callback(err)}
        const rows = <RowDataPacket[]> result;
        const datapoints: DataPoint[] = [];
        rows.forEach(row => {
          const datapoint: DataPoint =  {
            location: row.location,
            date: row.date,
            sensorType: row.sensorType,
            value: row.value
          }
          datapoints.push(datapoint);
        });
        
        callback(null, datapoints);
      }
    );
  };