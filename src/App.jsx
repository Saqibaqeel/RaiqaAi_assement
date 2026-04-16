import React from 'react'
import { Toaster } from 'react-hot-toast'
import FoodScreen from './pages/FoodScreen'

const App = () => {
  return (
    <>
    <FoodScreen/>
     <Toaster position='top-right' />
    </>
  )
}

export default App