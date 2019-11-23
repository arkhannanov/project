import React from 'react';
import './Login.scss';

const Login = () => {
    return (
        <div className='login'>
            <div className="login__title">Авторизация</div>
            <input className="login__login-input" type="text" placeholder="логин"/>
            <input className="login__password-input" type="password" placeholder="пароль"/>
            <button className="login__button">Войти</button>
            <div className="login__remember">
                <input className="login__remember-checkbox" type="checkbox"/>
                <div className="login__remember-content">Запомнить</div>
            </div>
        </div>
    )
}

export default Login;