import React from 'react';
import {NavLink} from "react-router-dom";
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar__news'>
        <NavLink to="/main">Главная</NavLink>
      </div>
      <div className='navbar__pfofile'>
        <NavLink to="/history">История</NavLink>
      </div>

    </nav>
  )
}

export default Navbar;