'use client'
import React from 'react'

import { Toaster } from "@/components/ui/toaster"

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store/store';


const StoreProvider = ({children}:any) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <Toaster />
      </PersistGate>
    </Provider>
  )
}

export default StoreProvider