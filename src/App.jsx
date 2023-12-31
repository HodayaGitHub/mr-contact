import { useState } from 'react'

import './assets/style/main.scss'

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { Footer } from './cmps/Footer.jsx'
import {AppHeader} from './cmps/AppHeader.jsx'
import { ContactIndex } from './pages/ContactIndex.jsx'


export function App() {

  return (
    <>
      <AppHeader />

      <Router>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<ContactIndex />} path="/contact" />

        </Routes>
      </Router>
    <Footer />
    </>
  )
}

