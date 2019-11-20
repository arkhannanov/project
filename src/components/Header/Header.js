import React from 'react';
import {NavLink} from "react-router-dom";
import './Header.scss';
import icon from './../../assets/images/icon.png';
import locationIcon from './../../assets/images/location-icon.png';
import logo from './../../assets/images/logo.png';


const Header = () => {
    return (
        <nav className='header'>
            <div className='header__logo'>
                <NavLink to="/home" className='header__item-link'><img src={logo} alt='Logo' vspace='10px'/></NavLink>
            </div>
            <div className='header__item'>
                <NavLink to="/home" className='header__item-link'>Home</NavLink>
            </div>
            <div className='header__item'>
                <NavLink to="/about" className='header__item-link'>About</NavLink>
            </div>
            <div className='header__item'>
                <NavLink to="/skills" className='header__item-link'>Skills</NavLink>
            </div>
            <div className='header__item'>
                <NavLink to="/education" className='header__item-link'>Education</NavLink>
            </div>
            <div className='header__icon'>
                <img src={icon} alt='icon' vspace='35px' hspace='20px'/>
            </div>
            <div className='header__location'>
                <img src={locationIcon} alt='location-icon'/>
                <div className='header__location-city'><a href='http://yandex.ru'>Saint-Petersburg</a></div>
            </div>
        </nav>
    )
}

export default Header;