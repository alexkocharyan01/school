import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    data: '',
}

export const changePassword = createAsyncThunk(
    'userUpdatePassword/fetchUserUpdatePassword',
    async ({value, token}) => {
        const response = await axios.patch(`${apiUrl}/user/update-password`, {
            ...value
        }, {
            headers: {'Authorization': 'Bearer ' + token}
        });
        return response.data;
    }
)

export const userUpdatePasswordSlice = createSlice({
    name: 'userUpdatePassword',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.error = false
            state.status = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(changePassword.pending, (state) => {
                state.status = false
                state.error = false
                state.data = ''
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.status = true
                state.error = false
                state.data = action.payload.status
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.data = ''
            })
    },
})
export const {clearData} = userUpdatePasswordSlice.actions;
export default userUpdatePasswordSlice.reducer
