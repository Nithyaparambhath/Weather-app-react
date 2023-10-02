import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const [isvalid,setIsValid] = useState(true)

  const searchLocation = (e)=>{

    console.log(location);
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
    axios.get(url).then((res)=>{
     console.log(res);
      
       
        setData(res.data)
      
    })
    setLocation("")
  }

  console.log(data);
  return (
    <div className='app'>
      <div className="search">
        <input type="text" placeholder='Enter Location' value={location} onChange={(e)=>setLocation(e.target.value)}/>
        <button onClick={searchLocation}>Search</button>
      </div>
      {!isvalid && 
      <div>Please Enter Valid Location</div>}
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data?.name}</p>
          </div>
          <div className="temp">
            { data.main? <h1>{data.main.temp.toFixed()} °F</h1>: null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p>:null}
           
          </div>
        </div>
        {data.name !=undefined && 
        
        <div className="bottom">
          <div className="feels">
            {data.main?<h2 className='bold'>{data.main.feels_like} °F </h2>:null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
          {data.main?<h2 className='bold'>{data.main.humidity} %</h2>:null}
            <p>humidity</p>
          </div>
          <div className="wind">
          {data.wind?<h2 className='bold'>{data.wind.speed} MPH</h2>:null}
           
            <p>Wind Speed</p>
          </div>
        </div>}
      </div>

    </div>
  );
}

export default App;
