import React, { useState, useEffect } from 'react';
import axios from 'axios';




export default function GetDataPoints(){ 
    const [points, getPoints] = useState(0);

    const baseURL = "http://localhost:3001/farm";

    useEffect(() => {
        getData();
    }, []);
    

    //GET data from server
    const getData = () => {
        axios.get(baseURL)
        .then(res => {
            const allPoints = res.data.data
            getPoints(allPoints)
          }).catch(err => {
            console.log(err)
        })
    }

    //Map the json objects that GET returns
    const renderData = (items) =>
    items.map((item) => {
      console.log(item)
      var location = <td>{item.location}</td>;
      var date = <td>{item.date}</td>
      var sensorType = <td>{item.sensorType}</td>;
      var value = <td>{item.value}</td>;
      return (
        <tr>
          {location}
          {date}
          {sensorType}
          {value}
        </tr>
      );
    });

    if (typeof points[0] !== "undefined") {
        console.log(points)
            return (
            <div>
                <table>
                  <tbody>{renderData(points)}</tbody>
                </table>
              </div>
            )
        }
    else{
        return(
            <div>
            Nothing
            </div>
        )
    }
}