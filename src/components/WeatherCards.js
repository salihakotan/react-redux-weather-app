import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherData } from "../redux/weatherSlice";

function WeatherCards() {
  const dispatch = useDispatch();

  const location = useSelector((state) => state.weather.location);
  const forecast = useSelector((state) => state.weather.forecast);

 
  const status = useSelector((state) => state.weather.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getWeatherData("Bursa"));
    }
  }, [dispatch, status]);


  if(status==="loading") {
    return <div>Loading...</div>
  }

  if(status==="failed") {
    return <div>Error</div>
  }


//   forecast.map((day) => (
//     console.log("day",day)
//   ))


  return (
    <div>
      <h1>WEATHER APP</h1>
      {location.name} - {location.region} - {location.country}
      <div className="cardsArea">
       
        
        {forecast.map((item,index) => (
            
            <div className={`card ${index === 0 ? "todayCard" : ""}`}>

            <p className="conditionText"> {item.day.condition.text}</p> <br/>
                <img className="weatherImage" src={`${item.day.condition.icon}`} alt="dayimage"/> 

                <br/>
                

                Wind: {item.day.maxwind_kph} kph <br/>
                Precip: {item.day.totalprecip_mm} mm <br/>

                <p className="temperatureText">{item.day.avgtemp_c}</p> <br/>
                min c: {item.day.mintemp_c}
                max c{item.day.maxtemp_c}

                {item.date} 
            </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherCards;
