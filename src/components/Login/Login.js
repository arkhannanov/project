import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import './Login.scss';
import {connect} from "react-redux";

const validate = values => {
    const errors = {}
    if (!values.login) {
        errors.login = "Укажите логин";
    }
    if (!values.password) {
        errors.password = "Укажите пароль";
    }
    return errors
}


export class loginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authActive: false,
            values: false
        }
    }

    renderLogin = ({input, label, type, meta: {touched, error, warning}}) => (<div>
            <input {...input} placeholder={label}
                   type={type} className={!this.state.authActive ? "login__login-input" : "login__login-input_active"}/>
            {touched && ((error && <span className="login__text-danger">{error}</span>) || (warning &&
                <span>{warning}</span>))}
        </div>
    )

    renderPassword = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            <input {...input} placeholder={label}
                   type={type} className={!this.state.authActive ? "login__password-input" : "login__password-input_active"}/>
            {touched && ((error && <span className="login__text-danger">{error}</span>) || (warning &&
                <span>{warning}</span>))}
        </div>
    )

    focus = () => {
        this.setState({authActive: true});
    }

    authBlur = () => {
        this.setState({authActive: false});
    }

    change = (e) => {
        console.log(e.target.value);
        if (e.target.value !== '') {
            this.setState({values: true});
        } else {
            this.setState({values: false});
        }
    }

    render() {

        const {authActive, values} = this.state;
        const {handleSubmit, error, pristine, submitting} = this.props;

        console.log(this.props);

        return (
            <form className={!authActive ? "login" : "login_active"} onSubmit={handleSubmit}>
                <div className={!authActive ? "login__title" : "login__title_active"}> Авторизация</div>
                <Field
                    name="login"
                    component={this.renderLogin}
                    label='логин'
                    type="text"
                    className={!authActive ? "login__login-input" : "login__login-input_active"}
                    onFocus={this.focus} onBlur={!values ? this.authBlur : undefined} onChange={this.change}
                />
                <Field
                    name="password"
                    component={this.renderPassword}
                    label='пароль'
                    type="password"
                    className={!authActive ? "login__password-input" : "login__password-input_active"}
                    onFocus={this.focus} onBlur={!values ? this.authBlur : undefined} onChange={this.change}
                />

                <button className={!authActive ? "login__button" : "login__button_active"} type='submit'
                        disabled={pristine || submitting}>Войти
                </button>
                <div className="login__remember">
                    <Field name="remember" className="login__remember-checkbox" type="checkbox" onFocus={this.focus} component="input"/>
                    <div
                        className={!authActive ? "login__remember-content" : "login__remember-content_active"}>Запомнить
                    </div>
                </div>
            </form>
        )
    }
}

const ReduxForm = reduxForm({form: 'login', validate})(loginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }
    return (<div>
            <ReduxForm onSubmit={onSubmit} isLoading={props.isLoading}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state.login.isLoading
})

export default connect(mapStateToProps, {})(Login);