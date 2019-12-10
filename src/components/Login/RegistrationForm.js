import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import './RegistationForm.scss';
import Captcha from "./Captcha";
import {ReCAPTCHA} from "react-google-recaptcha";
import Recaptcha from 'react-recaptcha';

const validate= values => {

    console.log(values.recaptcha)
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
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Подтвердите пароль";
    }
    if (!values.recaptcha) {
        errors.recaptcha = 'Введите капчу';
    }
    return errors
}


export class registationForm extends Component {

    Captcha = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            {touched && ((error && <span className="registration__captcha-text-danger">{error}</span>) || (warning &&
                <span>{warning}</span>))}
            <Recaptcha
                sitekey="6LcJ4cYUAAAAAGjYfFM4KKaAStQtq5u2OpbJVZk9"
                verifyCallback ={() => input.onChange(1)}
            />
        </div>
    );

    renderRegistration = ({input, label, type, meta: {touched, error, warning}}) => (<div>
            <input {...input} placeholder={label}
                   type={type} className="registration__input"/>
            {touched && ((error && <span className="registration__text-danger">{error}</span>) || (warning &&
                <span>{warning}</span>))}
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