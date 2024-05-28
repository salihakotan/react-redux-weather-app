import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getWeatherData = createAsyncThunk("weather/getWeatherData", async(city)=> {
    const res = await axios(`http://api.weatherapi.com/v1/forecast.json?key=36aaf9fda9294223a6e151536242805&q=${city}&days=7&aqi=no&alerts=no
    `)
    return await res.data
})



export const weatherSlice = createSlice({
    name:"weather",
    initialState:{
        forecast:[],
        location:[],
        status:"idle",
    },
    reducers:{},
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
    }
   

})



export default weatherSlice.reducer