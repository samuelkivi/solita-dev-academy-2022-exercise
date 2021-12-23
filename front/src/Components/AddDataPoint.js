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

  handleSubmit = event => {
    console.log("handleSubmit")
    event.preventDefault();

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