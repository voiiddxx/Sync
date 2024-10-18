'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    value: any | null; // Define value as User or null
}

const initialState: UserState = {
    value: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState, 
    reducers: {
        updateUser: (state, action: PayloadAction<any>) => { 
            state.value = action.payload;
        },
        clearUser: (state) => { 
            state.value = null;
        }
    },
});


export const { updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
