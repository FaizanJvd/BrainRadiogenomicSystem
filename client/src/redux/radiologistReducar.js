import { createSlice } from '@reduxjs/toolkit'
const radioSlice = createSlice({
  name: "radiologist",
  initialState: {
    currentUser: null,
    patientId:null,
    doctorId:null,
  },
  reducers: {
	radiologistId:(state,action)=>{
		state.currentUser = action.payload.currentUser;
	 },
     docAndPatId:(state,action)=>{
        state.patientId = action.payload.patientId;
        state.doctorId = action.payload.doctorId;
    },
  }
});
export const {radiologistId,docAndPatId} = radioSlice.actions;
export default radioSlice.reducer;