import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
  status: false,
  error: false,
  errorMessage: '',
  data: {},
  message: '',
}
const token = localStorage.getItem('ACCESS_TOKEN');

export const moderatorNotification = createAsyncThunk(
  'moderatorNotification',
  async (value, {rejectWithValue}) => {
      try {
          const response = await axios.get(`${apiUrl}/notification/notifications?limit=${value.limit}&offset=${value.offset}`,{
            headers: {'Authorization': 'Bearer ' + value.token}
          }).then();
          return response.data;
      } catch (e) {
          throw rejectWithValue(e.response.data.message);
      }
  }
)

export const moderatorNotificationChange = createAsyncThunk(
  'moderatorNotificationChange',
  async (value, {rejectWithValue}) => {
    console.log(value);
      try {
          const response = await axios.patch(`${apiUrl}/notification/notifications/${value.notificationId}`, {},{
            headers: {'Authorization': 'Bearer ' + value.token}
          }).then();
          return response.data;
      } catch (e) {
          throw rejectWithValue(e.response.data.message);
      }
  }
)

export const moderatorNotificationChangeFInish = createAsyncThunk(
  'moderatorNotificationChangeFInish',
  async (value, {rejectWithValue}) => {
      try {
          const response = await axios.post(`${apiUrl}/moderator/notifications/${value.notificationId}`, {}, {
              headers: {'Authorization': 'Bearer ' + value.token}
          });
          return response.data;
      } catch (e) {
          throw rejectWithValue(e.response.data.message);
      }
  }
)

export const ModeratorNotificationSlice = createSlice({
  name: 'moderatorStudentTeacher',
  initialState,
  extraReducers: (builder) => {
      builder
      .addCase(moderatorNotification.pending, (state) => {
        state.status = true
        state.error = false
        state.errorMessage = ''
    })
    .addCase(moderatorNotification.fulfilled, (state, action) => {
        state.status = false
        state.error = false
        state.data = action.payload
    })
    .addCase(moderatorNotification.rejected, (state, action) => {
        state.status = false
        state.error = true
        state.errorMessage = action.payload
    })
    .addCase(moderatorNotificationChange.pending, (state) => {
      state.status = true
      state.error = false
      state.errorMessage = ''
  })
  .addCase(moderatorNotificationChange.fulfilled, (state, action) => {
      state.status = false
      state.error = false
      state.data = action.payload
  })
  .addCase(moderatorNotificationChange.rejected, (state, action) => {
      state.status = false
      state.error = true
      state.errorMessage = action.payload
  })
  .addCase(moderatorNotificationChangeFInish.pending, (state, action) => {
    state.status = true
    state.error = false
    state.errorMessage = ''
  })
  .addCase(moderatorNotificationChangeFInish.fulfilled, (state, action) => {
    state.status = false
    state.error = false
    state.message = action.payload
  })
  .addCase(moderatorNotificationChangeFInish.rejected, (state, action) => {
    state.status = false
    state.error = true
    state.errorMessage = action.payload
  })
  }
})

export default ModeratorNotificationSlice.reducer
