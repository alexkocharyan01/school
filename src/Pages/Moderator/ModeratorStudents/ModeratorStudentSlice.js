import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
  status: false,
  error: false,
  errorMessage: '',
  data: {},
  levels: [],
}

export const moderatorStudentTable = createAsyncThunk(
  'moderatorStudentTable',
  async (value, {rejectWithValue}) => {
      try {
          const response = await axios.get(`${apiUrl}/moderator/students?limit=${value.limit}&offset=${value.offset}&name=${value.name}`,{
            headers: {'Authorization': 'Bearer ' + value.token}
          }).then();
          return response.data;
      } catch (e) {
          throw rejectWithValue(e.response.data.message);
      }
  }
)

export const moderatorStudentLevels = createAsyncThunk(
  'moderatorStudentLevels',
  async (value, {rejectWithValue}) => {
      try {
          const response = await axios.get(`${apiUrl}/moderator/levels`,{
            headers: {'Authorization': 'Bearer ' + value}
          }).then();
          return response.data;
      } catch (e) {
          throw rejectWithValue(e.response.data.message);
      }
  }
)
export const moderatorStudentLeavelChange = createAsyncThunk(
  'moderatorStudentLeavelChange',
  async (value, {rejectWithValue}) => {
      try {
          const response = await axios.patch(`${apiUrl}/moderator/students/${value.studentId}`, {...value.value},{
            headers: {'Authorization': 'Bearer ' + value.token}
          }).then();
          return response.data;
      } catch (e) {
          throw rejectWithValue(e.response.data.message);
      }
  }
)

export const teacherDelete = createAsyncThunk(
  'studentDelete',
  async (value, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`${apiUrl}/moderator/students/${value.studentId}`,{
            headers: {'Authorization': 'Bearer ' + value.token}
        }).then();
        return response.data;
    } catch (e) {
        throw rejectWithValue(e.response.data.message);
     }   }
)

export const moderatorStudentSlice = createSlice({
  name: 'moderatorStudentTeacher',
  initialState,
  extraReducers: (builder) => {
      builder
      .addCase(moderatorStudentTable.pending, (state) => {
        state.status = true
        state.error = false
        state.errorMessage = ''
      })
      .addCase(moderatorStudentTable.fulfilled, (state, action) => {
          state.status = false
          state.error = false
          state.data = action.payload
      })
      .addCase(moderatorStudentTable.rejected, (state, action) => {
          state.status = false
          state.error = true
          state.errorMessage = action.payload
      })
      .addCase(moderatorStudentLevels.pending, (state) => {
        state.status = true
        state.error = false
        state.errorMessage = ''
      })
      .addCase(moderatorStudentLevels.fulfilled, (state, action) => {
          state.status = false
          state.error = false
          state.levels = action.payload.data
        })
      .addCase(moderatorStudentLevels.rejected, (state, action) => {
          state.status = false
          state.error = true
          state.errorMessage = action.payload
      })
      .addCase(moderatorStudentLeavelChange.pending, (state) => {
        state.status = true
        state.error = false
        state.errorMessage = ''
      })
      .addCase(moderatorStudentLeavelChange.fulfilled, (state, action) => {
          state.status = false
          state.error = false
          state.data = action.payload
      })
      .addCase(moderatorStudentLeavelChange.rejected, (state, action) => {
          state.status = false
          state.error = true
          state.errorMessage = action.payload
      })
      .addCase(teacherDelete.pending, (state) => {
        state.status = true
        state.error = false
        state.errorMessage = ''
      })
      .addCase(teacherDelete.fulfilled, (state, action) => {
        state.status = false
        state.error = false
      })
      .addCase(teacherDelete.rejected, (state, action) => {
        state.status = false
        state.error = true
        state.errorMessage = action.payload
      })
    }
})

export default moderatorStudentSlice.reducer;
