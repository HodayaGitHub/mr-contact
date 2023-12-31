import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { HomePage } from './pages/HomePage.jsx'
import { Footer } from './cmps/Footer.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { store } from './store/store.js'

import { ContactIndex } from './pages/ContactIndex.jsx'
import { ContactDetails } from './pages/ContactDetails.jsx'

import './assets/style/main.scss'

export function App() {

  return (
    <>

      <Provider store={store}>
        <Router>
          <section className="main-layout app">
            <AppHeader />
            <main>
              <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<ContactIndex />} path="/contact" />
                <Route element={<ContactDetails />} path="/contact/:id" />

              </Routes>
            </main>
            <Footer />
          </section>
        </Router>
      </Provider>
    </>
  )
}

