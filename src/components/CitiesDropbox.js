import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCities, getWeatherData, setCity } from '../redux/weatherSlice'

function CitiesDropbox() {

    const dispatch = useDispatch()

    const cities = useSelector((state)=> state.weather.city.items)
    const city = useSelector((state)=> state.weather.city.name)

    const status = useSelector((state)=> state.weather.city.status)


    useEffect(()=> {
        if(status==="idle") {
            dispatch(getCities())
        }
        
    },[dispatch,status])


    const handleChange = (e) => {
        dispatch(setCity(e))
        dispatch(getWeatherData(e))
    }


    if(status ==="loading") {
        return <div>Loading...</div>
    }

    if(status ==="failed") {
        return <div>Error</div>
    }


  return (
    <div>
        <select value={city} name='cities' onChange={(e)=> handleChange(e.target.value)}>
            {cities.map((city,index) => (
                <option key={index} value={city.name}>{city.name}</option>
            ))}
        </select>
    </div>
  )
}

export default CitiesDropbox