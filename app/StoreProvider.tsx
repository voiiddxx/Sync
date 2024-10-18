'use client'
import React from 'react'
import { Provider } from 'react-redux'
import store from "../store/store"

const StoreProvider = ({children}:any) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default StoreProvider