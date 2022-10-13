import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: [],
    error: false,
    data: '',
}

const apiUrl = process.env.REACT_APP_API_URL;

export const connection = createAsyncThunk(
    'connection/fetchConnection',
    async (value) => {
        const response = await axios.get(`${apiUrl}/teacher/connections`, {
            headers: {'Authorization': 'Bearer ' + value}
        });
        return response.data;
    }
)

export const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(connection.pending, (state) => {
                state.status = true
                state.error = false
                state.data = ''
            })
            .addCase(connection.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload.data
            })
            .addCase(connection.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.data = ''
            })
    },
})

export default connectionSlice.reducer
