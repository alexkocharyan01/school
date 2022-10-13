import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    deleteStatus: '',
    errorMessage: '',
    data: {},
    studentsList: {},
}

const token = localStorage.getItem('ACCESS_TOKEN');

export const classDate = createAsyncThunk(
    'classDate',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/class?limit=1&offset=5`, {
                headers: {'Authorization': 'Bearer ' + value}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const studentsList = createAsyncThunk(
    'studentsList',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/teacher/connections`, {
                headers: {'Authorization': 'Bearer ' + value}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const classDatePost = createAsyncThunk(
    'classDatePost',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/teacher/class`, {
                ...value
            }, {
                headers: {'Authorization': 'Bearer ' + token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const studentClassDatePost = createAsyncThunk(
    'studentClassDatePost',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/student/class`, {classId: value.classId}, {
                headers: {'Authorization': 'Bearer ' + value.token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const classDelete = createAsyncThunk(
    'classDelete',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${apiUrl}/teacher/class/${value.id}`, {
                headers: {'Authorization': 'Bearer ' + value.token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const classDateSlice = createSlice({
    name: 'moderatorRegisterTeacher',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.deleteStatus = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(classDate.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(classDate.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload.data
            })
            .addCase(classDate.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(studentsList.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(studentsList.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.studentsList = action.payload
            })
            .addCase(studentsList.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(classDatePost.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(classDatePost.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(classDatePost.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(studentClassDatePost.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(studentClassDatePost.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(studentClassDatePost.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(classDelete.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(classDelete.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.deleteStatus = action.payload.status
            })
            .addCase(classDelete.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    },
})

export const {clearData} = classDateSlice.actions;
export default classDateSlice.reducer;
