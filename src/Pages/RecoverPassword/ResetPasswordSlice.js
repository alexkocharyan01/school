import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {forgetPasswordSlice} from "../ForgetPassword/ForgetPasswordSlice";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    data: {},
    error: false,
    errorMessage: '',
}

export const resetPasswordAsync = createAsyncThunk(
    'resetPassword/fetchResetPassword',
    async ({value, id}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/user/reset-password/${id}`, {
                ...value
            });
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers:   {
        clearData:  (state, action) => {
            state.error = false
            state.status = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetPasswordAsync.pending, (state) => {
                state.status = false
                state.errorMessage = ''
                state.data = ''
                state.error = false
            })
            .addCase(resetPasswordAsync.fulfilled, (state, action) => {
                state.status = true
                state.data = action.payload
                state.error = false
            })
            .addCase(resetPasswordAsync.rejected, (state, action) => {
                state.status = false
                state.errorMessage = action.payload
                state.error = true
            })
    },
})
export const {clearData} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer
