import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'


function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        welcome to mister contact!!!
      </div>

      <Routes>
      <Route element={<HomePage />} path="/" />

      </Routes>

    </>
  )
}

export default App
