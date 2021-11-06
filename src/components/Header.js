import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <header className='header'>
            <div className='container'>
                <nav className='nav-bar'>
                    <div className='nav-item'>
                        <Link to='/'>
                        <h4 className="navbar-brand d-flex  mr-auto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-film"
							viewBox="0 0 16 16"
						>
							<path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
						</svg>
						Moviepedia
					</h4>
                            {/* <img src='img/site-logo.svg' alt='logo' width='154' height='20' /> */}
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