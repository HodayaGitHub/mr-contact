import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import {AppHeader} from './cmps/AppHeader.jsx'


export function App() {

  return (
    <>

      <AppHeader />
      <main>
        <Router>
          <Routes>
            <Route element={<HomePage />} path="/" />
          </Routes>
        </Router>
      </main>

    </>
  )
}

