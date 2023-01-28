import { createSlice } from '@reduxjs/toolkit'
const recpSlice = createSlice({
  name: "recp",
  initialState: {
    currentPatient: null,
  },
  reducers: {
	patientId:(state,action)=>{
		state.currentPatient = action.payload.currentPatient;
	 }
  }
});
  export const {patientId} = recpSlice.actions;
  export default recpSlice.reducer;
  
