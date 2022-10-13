import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    errorMessage: '',
    data: {},
}

export const registerAsync = createAsyncThunk(
    'register/fetchRegister',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/user/signup`, {
                ...value
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers:   {
        clearData:  (state, action) => {
            state.data = {}
            state.status = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.status = false
                state.errorMessage = ''
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.status = true
                state.data = action.payload
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.status = false
                state.errorMessage = action.payload
            })
    },
})

export const {clearData} = registerSlice.actions;
export default registerSlice.reducer
