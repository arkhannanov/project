import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './Header.scss';
import icon from './../../assets/images/icon.png';
import locationIcon from './../../assets/images/location-icon.png';
import logo from './../../assets/images/logo.png';

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            homeActive: true,
            aboutActive: false,
            skillsActive: false,
            educationActive: false
        }
    }

    handleClick = (e) => {

        if (e.target.name === 'home') {
            this.setState({
                homeActive: true,
                aboutActive: false,
                skillsActive: false,
                educationActive: false
            })
        }

        if (e.target.name === 'about') {
            this.setState({
                homeActive: false,
                aboutActive: true,
                skillsActive: false,
                educationActive: false
            })
        }

        if (e.target.name === 'skills') {
            this.setState({
                homeActive: false,
                aboutActive: false,
                skillsActive: true,
                educationActive: false
            })
        }

        if (e.target.name === 'education') {
            this.setState({
                homeActive: false,
                aboutActive: false,
                skillsActive: false,
                educationActive: true
            })
        }
    }


    render() {
        const {homeActive, aboutActive, skillsActive, educationActive} = this.state;

        console.log(this.state);

        return (
            <nav className='header'>
                <div className='header__logo'>
                    <NavLink to="/home" className='header__item-link'><img src={logo} alt='Logo' vspace='10px'/></NavLink>
                </div>
                <div className={!homeActive ?'header__item' : 'header__item_active'}>
                    <NavLink to="/home" className='header__item-link' name='home' onClick={(e) => this.handleClick(e)}>Home</NavLink>
                </div>
                <div className={!aboutActive ?'header__item' : 'header__item_active'}>
                    <NavLink to="/about" className='header__item-link' name='about' onClick={(e) => this.handleClick(e)}>About</NavLink>
                </div>
                <div className={!skillsActive ?'header__item' : 'header__item_active'}>
                    <NavLink to="/skills" className='header__item-link'  name='skills' onClick={(e) => this.handleClick(e)}>Skills</NavLink>
                </div>
                <div className={!educationActive ?'header__item' : 'header__item_active'}>
                    <NavLink to="/education" className='header__item-link'  name='education' onClick={(e) => this.handleClick(e)}>Education</NavLink>
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
}

export default Header;