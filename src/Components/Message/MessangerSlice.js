import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: [],
    error: false,
    data: '',
    dataMessages: {},
    receiverId: '',
    senderName: '',
    senderImg: ''
}
const API_URL = "http://localhost:3000/api/v1/user/connections";

export const messageAsync = createAsyncThunk(
    'userConnections/fetchUserConnections',
    async (value) => {
        const response = await axios.get(API_URL, {
            headers: {'Authorization': 'Bearer ' + value}
        });
        return response.data;
    }
)

export const messangeSlice = createSlice({
    name: 'userConnections',
    initialState,
    reducers: {
        getMessages: (state, action) => {
            state.dataMessages = action.payload
        },
        getReceiverId: (state, action) => {
            state.receiverId = action.payload
        },
        getSenderName: (state, action) => {
            state.senderName = action.payload
        },
        getSenderImg: (state, action) => {
            state.senderImg = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(messageAsync.pending, (state) => {
                state.status = true
                state.error = false
                state.data = ''
            })
            .addCase(messageAsync.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload.data
            })
            .addCase(messageAsync.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.data = ''
            })
    },
})

export const {getMessages} = messangeSlice.actions;
export const {getReceiverId} = messangeSlice.actions;
export const {getSenderName} = messangeSlice.actions;
export const {getSenderImg} = messangeSlice.actions;

export default messangeSlice.reducer
