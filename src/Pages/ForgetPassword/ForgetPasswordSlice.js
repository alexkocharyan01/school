import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {registerSlice} from "../Register/RegisterStudent/registerStudentSlice";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    data: {},
    error: false,
    errorMessage: '',
}

export const forgetPasswordAsync = createAsyncThunk(
    'forgetPassword/fetchForgetPassword',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/user/require-reset`, {
                ...value
            });
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)


export const forgetPasswordSlice = createSlice({
    name: 'register',
    initialState,
    reducers:   {
        clearData:  (state, action) => {
            state.error = false
            state.status = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(forgetPasswordAsync.pending, (state) => {
                state.status = false
                state.errorMessage = ''
                state.data = ''
                state.error = false
            })
            .addCase(forgetPasswordAsync.fulfilled, (state, action) => {
                state.status = true
                state.data = action.payload
                state.error = false
            })
            .addCase(forgetPasswordAsync.rejected, (state, action) => {
                state.status = false
                state.errorMessage = action.payload
                state.error = true
            })
    },
})
export const {clearData} = forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer
