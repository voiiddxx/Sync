import { createSlice } from "@reduxjs/toolkit"



const initialState : any = {
    value: true,
    currentTab: 'home',
}


const windowSlice = createSlice({
    name:'window',
    initialState,
    reducers:{
        updateSidebar : (state , action)=>{
            state.value = action.payload;
        },
        updateCurrentTab : (state , action)=>{
            state.currentTab = action.payload;
        }
    }
})


export const  {updateSidebar , updateCurrentTab} = windowSlice.actions;

export default windowSlice.reducer;