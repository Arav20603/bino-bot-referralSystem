import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CreateUserProps, GetUserProps, LoginProps, UserSliceStateProps } from "../../../constants/types";
import axios from "axios";


const initialState: UserSliceStateProps = {
  item: null,
  loading: false,
  error: null
}

const API_URL = 'http://localhost:5000/api/web/bino-bot'

export const createUser = createAsyncThunk(
  'user/signup',
  async (data: CreateUserProps) => {
    const res = await axios.post(`${API_URL}/signup`, data)
    console.log(res.data)
    return res.data.user
  }
)

export const fetchUser = createAsyncThunk(
  'user/login',
  async (userData: LoginProps) => {
    const res = await axios.post(`${API_URL}/login`, userData)
    console.log(res.data)
    return res.data
  }
)

export const logOut = createAsyncThunk(
  'user/logout',
  async () => {
    const res = await axios.post(`${API_URL}/logout`)
    console.log(res)
    return res.data.user
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(createUser.fulfilled, (state) => {
      state.loading = false
      state.error = null
    })
    .addCase(createUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder
    .addCase(fetchUser.pending, (state) => {
      state.error = null
      state.loading = true
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.item = action.payload
      localStorage.setItem('user', JSON.stringify(state.item))
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.loading = true
      state.error = action.error.message
    })
    builder
    .addCase(logOut.pending, (state) => {
      state.loading = true
    })
    .addCase(logOut.fulfilled, (state) => {
      state.loading = false
      state.item = null
      localStorage.clear()
    })
    .addCase(logOut.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default userSlice.reducer