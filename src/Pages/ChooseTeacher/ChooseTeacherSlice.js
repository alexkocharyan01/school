import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: [],
    teacherData: [],
    teacherDataStatus: false,
}

export const chooseTeacherAsync = createAsyncThunk(
    'chooseTeacher/fetchTeachers',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/student/teachers?limit=20&offset=0`, {
                headers: {'Authorization': 'Bearer ' + value}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const chooseTeacher = createAsyncThunk(
    'chooseTeacher/fetchChooseTeacher',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/student/choose-teacher/${value.teacherId}`, {teacherId: value.teacherId}, {
                headers: {'Authorization': 'Bearer ' + value.token}
            });
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const chooseTeacherSlice = createSlice({
    name: 'chooseTeacher',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(chooseTeacherAsync.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(chooseTeacherAsync.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(chooseTeacherAsync.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(chooseTeacher.pending, (state) => {
                state.status = true
                state.teacherDataStatus = false
                state.error = false
                state.errorMessage = ''
            })
            .addCase(chooseTeacher.fulfilled, (state, action) => {
                state.status = false
                state.teacherDataStatus = true
                state.error = false
                state.teacherData = action.payload
            })
            .addCase(chooseTeacher.rejected, (state, action) => {
                state.status = false
                state.teacherDataStatus = false
                state.error = true
                state.errorMessage = action.payload
            })
    },
})

export default chooseTeacherSlice.reducer;
