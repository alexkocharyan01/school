import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: {},
}

export const registerTeacherAsync = createAsyncThunk(
    'registerTeacher/fetchRegisterTeacher',
    async (formData, {rejectWithValue}) => {
        // const response = await axios.post(API_URL,formData);
        // return response.data;
        try {
            const response = await axios.post(`${apiUrl}/user/leave-request`, formData).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const registerTeacherSlice = createSlice({
    name: 'register',
    initialState,
    reducers:   {
        clearData:  (state, action) => {
            state.data = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerTeacherAsync.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(registerTeacherAsync.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(registerTeacherAsync.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    },
})

export const {clearData} = registerTeacherSlice.actions;
export default registerTeacherSlice.reducer