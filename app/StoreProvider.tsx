'use client'
import React, { useEffect } from 'react'

import { Toaster } from "@/components/ui/toaster"

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store/store';
import axios from 'axios';


const StoreProvider = ({children}:any) => {


  // useEffect(()=>{
  //   axios.get('/api/cron').then(()=>(console.log("Cron Jon called")
  //   ))
  // } , [])

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