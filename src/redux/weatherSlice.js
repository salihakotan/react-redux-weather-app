import { createSlice } from "@reduxjs/toolkit";




export const weatherSlice = createSlice({
    name:"weather",
    initialState:{
        items:[],
        state:"idle",
    },
    reducers:{},
    extraReducers:builder => 
        builder
    .addCase()

})



export default weatherSlice.reducer