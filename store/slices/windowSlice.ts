import { createSlice } from "@reduxjs/toolkit"



const initialState : any = {
    value: true,
    currentTab: 'home',
    darkMode: false
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
        },
        updateDarkMode : (state , action)=>{
            state.darkMode = action.payload
        }
    }
})


export const  {updateSidebar , updateCurrentTab , updateDarkMode} = windowSlice.actions;

export default windowSlice.reducer;