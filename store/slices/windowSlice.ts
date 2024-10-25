import { createSlice } from "@reduxjs/toolkit"



const initialState : any = {
    value: true
}


const windowSlice = createSlice({
    name:'window',
    initialState,
    reducers:{
        updateSidebar : (state , action)=>{
            state.value = action.payload;
        }
    }
})


export const  {updateSidebar} = windowSlice.actions;

export default windowSlice.reducer;