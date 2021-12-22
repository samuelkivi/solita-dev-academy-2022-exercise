import express, {Request, Response} from "express";
import {Farm, DataPoint} from "./farm";
import * as dbConnection from "./database";

const router = express.Router();


router.post("/", async (req: Request, res: Response) => {
  console.log("POST")
  console.log(typeof req.body.location)
  console.log(req.body)
  const newDataPoint: DataPoint = req.body;
  dbConnection.insertIntoFarms(newDataPoint, (err: Error, orderId: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"DataPoint received": req.body.location});
  });
});

router.get("/", async (req: Request, res: Response) => {
  console.log("GET")
  dbConnection.findAll((err: Error, datapoints: DataPoint[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": datapoints});
  });
});


export {router};