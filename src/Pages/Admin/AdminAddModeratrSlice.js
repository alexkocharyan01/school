import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: {},
    userData: {},
}

export const createModerator = createAsyncThunk(
    'createModerator',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/admin/create-moderator`, {
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

export const tableUser = createAsyncThunk(
    'tableUsers',
    async (value, {rejectWithValue}) => {
        console.log(value);
        try {
            const response = await axios.get(`${apiUrl}/admin/users?name=${value.name}&limit=${value.limit}&offset=${value.offset}`, {
                headers: {'Authorization': 'Bearer ' + value.token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const tableUserDelete = createAsyncThunk(
    'tableUsersDelete',
    async (value, {rejectWithValue}) => {
        console.log(value);
        try {
            const response = await axios.delete(`${apiUrl}/admin/${value.id}`, {
                headers: {'Authorization': 'Bearer ' + value.token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)


export const createModeratorSlice = createSlice({
    name: 'createModerator',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.data = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createModerator.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(createModerator.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(createModerator.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(tableUser.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(tableUser.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.userData = action.payload
            })
            .addCase(tableUser.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(tableUserDelete.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(tableUserDelete.fulfilled, (state, action) => {
                state.status = false
                state.error = false
            })
            .addCase(tableUserDelete.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    },
})

export const {clearData} = createModeratorSlice.actions;
export default createModeratorSlice.reducer;
