import React from 'react'
import { NavLink } from 'react-router-dom'


export function AppHeader(){

    return (
        <header className="app-header full main-layout">
        <section className="header-container">
            <h1>CONTACTS</h1>
            <nav className="app-nav">
                {/* <NavLink className="header-link" to="/">Home</NavLink> */}
                {/* <NavLink className="header-link" to="/contact">Contacts</NavLink> */}
            </nav>
        </section>



    </header >
    )
}