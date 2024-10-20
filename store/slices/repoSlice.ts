import { createSlice } from "@reduxjs/toolkit"


const initialState: any = {
    value: null
}


const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
        updateUserRepo: (state, action) => {
            state.value = action.payload;
        },
        clearRepo: (state) => {
            state.value = null;
        }
    }
})


export const {updateUserRepo , clearRepo} = repoSlice.actions;


export default repoSlice.reducer;