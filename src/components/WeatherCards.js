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
      dispatch(getWeatherData("Kestel"));
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
       
        
        {forecast.map((item) => (
            <div className="card">
                Tarih: {item.date} <br/>

                Wind: {item.day.maxwind_kph} kph <br/>
                Precip: {item.day.totalprecip_mm} mm <br/>

                ortalama sıcaklık: {item.day.avgtemp_c} <br/>
                min sıcaklık: {item.day.mintemp_c}
                max sıcaklık: {item.day.maxtemp_c}

                Durum: {item.day.condition.text} <br/>
                Görsel: <img src={`${item.day.condition.icon}`} alt="dayimage"/>
            </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherCards;
