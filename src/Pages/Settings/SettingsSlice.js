import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: {},
    emailError: false,
    emailData: false
}

export const settingsAsync = createAsyncThunk(
    'me/login',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/user/me`, {
                headers: {'Authorization': 'Bearer ' + value}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const emailChangeAsync = createAsyncThunk(
    'me/emailChange',
    async (value, {rejectWithValue}) => {
        try {
            console.log(value)
            const response = await axios.post(`${apiUrl}/user/email-change`,  {newEmail: value.email.newEmail}, {
                headers: {'Authorization': 'Bearer ' + value.token}
            });
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const nameChangeAsync = createAsyncThunk(
    'me/nameChange',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`${apiUrl}/user/me`, {
                ...value.name
            }, {
                headers: {'Authorization': 'Bearer ' + value.token}
            });
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const settingsSlice = createSlice({
    name: 'me',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.emailData = false
            state.emailError = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(settingsAsync.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(settingsAsync.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(settingsAsync.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(emailChangeAsync.pending, (state) => {
                state.status = true
                state.emailError = false
                state.errorMessage = ''
                state.emailData = false
            })
            .addCase(emailChangeAsync.fulfilled, (state, action) => {
                state.status = false
                state.emailError = false
                state.emailData = true
            })
            .addCase(emailChangeAsync.rejected, (state, action) => {
                state.status = false
                state.emailError = true
                state.errorMessage = action.payload
                state.emailData = false
            })
            .addCase(nameChangeAsync.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(nameChangeAsync.fulfilled, (state, action) => {
                state.status = false
                state.error = false
            })
            .addCase(nameChangeAsync.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    },
})
export const {clearData} = settingsSlice.actions;

export default settingsSlice.reducer
