


import { createSlice } from "@reduxjs/toolkit"



const initialState : any = {
    value: null
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        updateUserValue : (state , action)=>{
            state.value = action.payload;
        }
    }
})


export const  {updateUserValue} = userSlice.actions;

export default userSlice.reducer;