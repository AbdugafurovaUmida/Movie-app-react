import React, { useState } from "react"
import { Link } from "react-router-dom"


const Hamburger = () => {

    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

    const closeMenu = () => {
        setNavbarOpen(false)
    }
    return (
        <div className={`hamburger ${navbarOpen ? " showMenu" : ""}`}>
            <button className='hamburger__btn' onClick={handleToggle}>
                {!navbarOpen ? <img className='toggle-btn' src='img/toggle.svg' alt='hamburger-toggle'/> : <ul className='hamburger-menu'>
                <li className='hamburger-menu__item'><Link className='menu__link' to='/catalog'>Catalog</Link></li>
                <li className='hamburger-menu__item'><Link className='menu__link' to='/search'>Search</Link></li>
                <i onClick={() => closeMenu()} className="fas fa-times"></i>
            </ul>}</button>
        </div>
    )


}

export default Hamburger;