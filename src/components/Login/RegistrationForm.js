import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import './RegistationForm.scss';
import Captcha from "./Captcha";
import {ReCAPTCHA} from "react-google-recaptcha";
import Recaptcha from 'react-recaptcha';
import {ReactPasswordStrength} from "react-password-strength";

const validate = values => {
    const errors = {}
    if (!values.login) {
        errors.login = "Укажите логин";
    }
    if (!values.email) {
        errors.email = 'Укажите e-mail'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Неправильный e-mail'
    }
    if (!values.password) {
        errors.password = "Укажите пароль";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.password)) {
        errors.email = 'Неправильный e-mail'
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Подтвердите пароль";
    }
    if (!values.recaptcha) {
        errors.recaptcha = 'Введите капчу';
    }
    if (values.password !== values.confirmPassword) {
        errors.password = "Пароли не совпадают";
        errors.confirmPassword = "Пароли не совпадают";
    }
    return errors
}


export class registationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password_strength: null
        }
    }

    checkPassword = (e) => {
        const password = e.target.value;
        const password_strength = 0;
        var strength = this.state.password_strength;
        if (password.match(/[a-zA-Z0-9][a-zA-Z0-9]+/)) {
            strength += 1
        }
        if (password.match(/[~<>]+/)) {
            strength += 1
        }
        if (password.match(/[!@£$%^&()]+/)) {
            strength += 1
        }
        if (password.length > 5) {
            strength += 1
        }
        this.setState({password_strength: strength});
    }

    Captcha = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            <Recaptcha
                sitekey="6LcJ4cYUAAAAAGjYfFM4KKaAStQtq5u2OpbJVZk9"
                verifyCallback={() => input.onChange(1)}
            />
            {touched && ((error && <span className="registration__captcha-text-danger">{error}</span>) || (warning &&
                <span>{warning}</span>))}
        </div>
    );

    renderRegistration = ({input, label, type, meta: {touched, error, warning}}) => (<div>
            <input {...input} placeholder={label}
                   type={type} className="registration__input" onKeyUp={this.checkPassword} />
            {touched && ((error && <span className="registration__text-danger">{error}</span>) || (warning &&
                <span>{warning}</span>))}
            <progress max="100" value={(this.state.password_strength * 20)} id="strength"></progress>
            {/*<ReactPasswordStrength*/}
            {/*    className="customClass"*/}
            {/*    style={{ display: 'none' }}*/}
            {/*    minLength={5}*/}
            {/*    minScore={2}*/}
            {/*    scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}*/}
            {/*    // changeCallback={foo}*/}
            {/*    inputProps={{ name: "password_input", autoComplete: "off", className: "form-control" }}*/}
            {/*/>*/}
        </div>
    )

    render() {

        const {handleSubmit, error, pristine, submitting} = this.props;

        return (
            <form className="registration" onSubmit={handleSubmit}>
                <Field
                    name="login"
                    component={this.renderRegistration}
                    label='логин'
                    type="text"
                />
                <Field
                    name="email"
                    component={this.renderRegistration}
                    label='e-mail'
                    type="text"
                />
                <Field
                    name="password"
                    component={this.renderRegistration}
                    label='пароль'
                    type="password"
                />
                <Field
                    name="confirmPassword"
                    component={this.renderRegistration}
                    label='подтверждение пароля'
                    type="password"
                />
                <div className="registration__captcha">
                    <Field name='recaptcha' component={this.Captcha}/>
                </div>
                <button className="registration__button" type='submit'
                        disabled={pristine || submitting}>Регистрация
                </button>
            </form>
        )
    }
}

const ReduxForm = reduxForm({form: 'registration', validate})(registationForm);

const Registration = (props) => {
    const onSubmitRegistration = (formData) => {
        console.log(formData);
    }
    return (<div>
            <ReduxForm onSubmit={onSubmitRegistration} isLoading={props.isLoading}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state.login.isLoading
})

export default connect(mapStateToProps, {})(Registration);