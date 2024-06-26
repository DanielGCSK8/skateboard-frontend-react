import React from 'react';
import { Link } from 'react-router-dom';
import spitFire from '../../../src/images/spit-fire.png';

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={spitFire} height="55px" />
                    </Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fw-bold" to="/adminMaderos">Administrar Maderos</Link>
                            </li>
                        </ul>

                </div>
            </nav>
        </div>
    );
}

export default NavBar;