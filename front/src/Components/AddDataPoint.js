import React from 'react';
import axios from 'axios';

const baseURL = "http://localhost:3001/farm";

export default class AddDataPoint extends React.Component {
  state = {
    location: "",
    date: "",
    sensorType: "",
    value: null
  }

  refreshPage() {
    window.location.reload(false);
  }

  locationChange = event => {
    this.setState({ location: event.target.value });
  }

  dateChange = event => {
    this.setState({ date: event.target.value });
  }

  sensorTypeChange = event => {
    this.setState({ sensorType: event.target.value });
  }

  valueChange = event => {
    this.setState({ value: event.target.value });
  }

  sendData = () => {
    console.log("sendData")
    axios.post(baseURL, { 
      location: this.state.location,
      date: this.state.date,
      sensorType: this.state.sensorType,
      value: this.state.value
     })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("handleSubmit")
    if(this.state.sensorType === "pH"){
      if(this.state.value <= 14 && this.state.value >= 0){
        this.sendData()
      }
      else{
        alert("pH must be between 0 and 14");
      }
    }
    else if(this.state.sensorType === "temperature"){
      if(this.state.value <= 100 && this.state.value >= -50){
        this.sendData()
      }
      else{
        alert("temperature must be between -50 and 100");
      }
    }
    else if(this.state.sensorType === "rainFall"){
      if(this.state.value <= 500 && this.state.value >= 0){
        this.sendData()
      }
      else{
        alert("temperature must be between 0 and 500");
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Location:
            <input type="text" location="location" onChange={this.locationChange} />
          </label>
          <label>
            Date:
            <input type="text" name="name" onChange={this.dateChange} />
          </label>
          <label>
            SensorType:
            <input type="text" name="name" onChange={this.sensorTypeChange} />
          </label>
          <label>
            Value:
            <input type="text" name="name" onChange={this.valueChange} />
          </label>
          <button onClick={this.refreshPage} type="submit">Add</button>
        </form>
      </div>
    )
  }
}