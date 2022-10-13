import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: {},
    role: ''
}

export const loginAsync = createAsyncThunk(
    'login/fetchLogin',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                ...value
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const logoutAsync = createAsyncThunk(
    'login/fetchLogout',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/logout`, {}, {
                headers: {'Authorization': 'Bearer ' + value}
            });
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.data = {}
            state.role = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
                state.data = {}
                state.role = ''
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
                state.role = action.payload.data.updatedUser.role.toLowerCase()
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    },
})

export const {clearData} = loginSlice.actions;

export default loginSlice.reducer
