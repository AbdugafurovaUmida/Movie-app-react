import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <header className='header'>
            <div className='container'>
                <nav className='nav-bar'>
                    <div className='nav-item'>
                        <Link to='/'>
                            <img src='img/site-logo.svg' alt='logo' width='154' height='20' />
                        </Link>
                        <ul className='menu'>
                            <li className='menu__item'>Фильмы</li>
                            <li className='menu__item'>Сериалы</li>
                        </ul>
                    </div>
                    <div className='nav-item'>
                        <ul className='menu'>
                           <li className='menu__item'><Link className='menu__link' to='/catalog'>Catalog</Link></li>
                           <li className='menu__item'><Link className='menu__link' to='/search'>Search</Link></li> 
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;