import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { Footer } from './cmps/Footer.jsx'


export function App() {

  return (
    <>
      <div>
        welcome to mister contact!!!
      </div>
      <Router>
        <Routes>
          <Route element={<HomePage />} path="/" />

        </Routes>
      </Router>
    <Footer />
    </>
  )
}

