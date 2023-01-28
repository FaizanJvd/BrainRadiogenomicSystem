import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    recieverId:null,
    chatId: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.currentUser;
    },
    chatCreated:(state,action)=>{
      state.recieverId = action.payload.recieverId;
      state.chatId = action.payload.chatId
    },
  },
});

export const {loginSuccess,chatCreated} = userSlice.actions;
export default userSlice.reducer;
