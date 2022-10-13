import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: {},
    meetingData: {},
    userData: {}
}

const token = localStorage.getItem('ACCESS_TOKEN');

export const moderatorRegisterTeacher = createAsyncThunk(
    'moderatorRegisterTeacher',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/moderator/teachers`, {
                ...value.data
            }, {
                headers: {'Authorization': 'Bearer ' + value.token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const moderatorTeacherTable = createAsyncThunk(
    'moderatorTeacherTable',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/moderator/teachers?limit=${value.limit}&offset=${value.offset}&name=${value.name}`, {
                headers: {'Authorization': 'Bearer ' + value.token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const phoneChangeAsync = createAsyncThunk(
    'name/change',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`${apiUrl}/moderator/phone/${value.value.id}`, {phone: value.value.phone}, {
                headers: {'Authorization': 'Bearer ' + value.token}
            });
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const teacherStatus = createAsyncThunk(
    'teacherStatus',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`${apiUrl}/moderator/teachers/${value.id}`, {active: value.active}, {
                headers: {'Authorization': 'Bearer ' + value.token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const moderatorAddMeeting = createAsyncThunk(
    'moderatorAddMeeting',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/moderator/meeting`, {
                ...value.value
            }, {
                headers: {'Authorization': 'Bearer ' + value.token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const moderatorRegisterTeacherSlice = createSlice({
    name: 'moderatorRegisterTeacher',
    initialState,
    reducers: {
        clearData: (state) => {
            state.data = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(moderatorRegisterTeacher.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(moderatorRegisterTeacher.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(moderatorRegisterTeacher.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(moderatorTeacherTable.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(moderatorTeacherTable.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.userData = action.payload
            })
            .addCase(moderatorTeacherTable.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(phoneChangeAsync.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(phoneChangeAsync.fulfilled, (state, action) => {
                state.status = false
                state.error = false
            })
            .addCase(phoneChangeAsync.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(teacherStatus.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(teacherStatus.fulfilled, (state, action) => {
                state.status = false
                state.error = false
            })
            .addCase(teacherStatus.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(moderatorAddMeeting.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(moderatorAddMeeting.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.meetingData = action.payload
            })
            .addCase(moderatorAddMeeting.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    },
})

export const {clearData} = moderatorRegisterTeacherSlice.actions;
export default moderatorRegisterTeacherSlice.reducer;
