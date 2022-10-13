import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: {},
}

export const notification = createAsyncThunk(
    'createNotification/fetchCreateNotification',
    async ({value, token}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/notification/create-notification`, {
                ...value
            }, {
                headers: {'Authorization': 'Bearer ' + token}
            });
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const helpSlice = createSlice({
    name: 'createNotification',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.error = false
            state.status = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(notification.pending, (state) => {
                state.status = false
                state.error = false
                state.data = ''
            })
            .addCase(notification.fulfilled, (state, action) => {
                state.status = true
                state.error = false
                state.data = action.payload
            })
            .addCase(notification.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.data = ''
            })
    },
})
export const {clearData} = helpSlice.actions;
export default helpSlice.reducer
