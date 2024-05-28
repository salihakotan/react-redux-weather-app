import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getWeatherData = createAsyncThunk("weather/getWeatherData", async(city)=> {
    const res = await axios(`https://api.weatherapi.com/v1/forecast.json?key=36aaf9fda9294223a6e151536242805&q=${city}&days=7&aqi=no&alerts=no
    `)
    return await res.data
})


export const getCities = createAsyncThunk("weather/getCities", async()=> {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/items`)
    console.log("res.data: ",res.data)
    return await res.data
})

export const weatherSlice = createSlice({
    name:"weather",
    initialState:{
        forecast:[],
        location:[],
        status:"idle",
        city:{
            name:"Bursa",
            items:[],
            status:"idle"
        }
    },
    reducers:{
        setCity: (state,action) => {
            state.city.name = action.payload
        }
    },
    extraReducers:builder => {
        builder
        .addCase(getWeatherData.pending, (state,action)=> {
            state.status = "loading"
        })
        .addCase(getWeatherData.fulfilled, (state,action)=> {
            state.status = "succeeded"
            state.forecast = action.payload.forecast.forecastday
            state.location = action.payload.location

            console.log("forecast: ", state.forecast)
            console.log("location: ", state.location)
        }) 
        .addCase(getWeatherData.rejected, (state,action)=> {
            state.status = "failed"
        })


        .addCase(getCities.pending, (state,action)=> {
            state.city.status = "loading"
            console.log("city loading")
        })
        .addCase(getCities.fulfilled, (state,action)=> {
            state.city.status = "succeeded"
            console.log("city succeeded")

            
            state.city.items = action.payload
            console.log("cities payload",action.payload)
        }) 
        .addCase(getCities.rejected, (state,action)=> {
            state.city.status = "failed"
            console.log("failed", action.error.message)

        })
    }
   

})


export const {setCity} = weatherSlice.actions

export default weatherSlice.reducer