import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {loginSlice} from "../Login/loginSlice";

const initialState = {
    status: [],
    error: false,
    getToken: '',
    endCall: '',
    rateTeacher: '',
    roomNumber: ''
}

const API_URL = "http://localhost:3000/api/v1/video/token/a28227f6-079a-429b-851c-9df01ad775bc";
const API_URL2 = "http://localhost:3000/api/v1/video/finish/a28227f6-079a-429b-851c-9df01ad775bc";
const token = localStorage.getItem('ACCESS_TOKEN')

export const getToken = createAsyncThunk(
    'getToken/fetchGetToken',
    async (value) => {
        const response = await axios.get(`http://localhost:3000/api/v1/video/token/${value.roomNumber}`, {
            headers: {'Authorization': 'Bearer ' + value.token}
        });
        return response.data;
    }
)

export const endCall = createAsyncThunk(
    'endCall/fetchEndCall',
    async (value) => {
        console.log(value)
        const response = await axios.get(`http://localhost:3000/api/v1/video/finish/${value.roomNumber}`, {
            headers: {'Authorization': 'Bearer ' + value.token}
        });
        return response.data;
    }
)

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        getRoomNumber: (state, action) => {
            state.roomNumber = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getToken.pending, (state) => {
                state.status = true
                state.error = false
                state.data = ''
            })
            .addCase(getToken.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.getToken = action.payload.data
            })
            .addCase(getToken.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.data = ''
            })
            .addCase(endCall.pending, (state) => {
                state.status = true
                state.error = false
                state.data = ''
            })
            .addCase(endCall.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.endCall = action.payload.data
            })
            .addCase(endCall.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.data = ''
            })
    },
})

export const {getRoomNumber} = videoSlice.actions;

export default videoSlice.reducer
