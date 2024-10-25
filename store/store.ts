// store.ts
'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import repoReducer from './slices/repoSlice';
import windorReducer from './slices/windowSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage engine
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  repo: repoReducer,
  window:windorReducer 
});

// Configure redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with middleware customization
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
