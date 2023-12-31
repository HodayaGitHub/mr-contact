import { useState } from 'react'

import './assets/style/main.scss'

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { Footer } from './cmps/Footer.jsx'
import {AppHeader} from './cmps/AppHeader.jsx'
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

    </>
  )
}

