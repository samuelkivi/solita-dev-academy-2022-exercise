import AddDataPoint from './Components/AddDataPoint';
import GetDataPoints from './Components/GetDataPoints';
import './App.css';


function App() {
  return (
    <div className="App">
      <div>
        <h1>Add datapoint</h1>
      </div>
      <AddDataPoint/>
      <div>
        <h1>Farms</h1>
      </div>
      <GetDataPoints/>
    </div>
  );
}

export default App;
