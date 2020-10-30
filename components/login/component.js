import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import Link from 'next/link';
import Router from 'next/router';
import ReCAPTCHA from 'react-google-recaptcha';

// components
import Field from 'components/form/Field';
import Input from 'components/form/Input';
import Spinner from 'components/ui/spinner';

// services
import { loginUser, registerUser } from 'services/user';

// constants
import { FORM_ELEMENTS } from './constants';

// styles
import styles from './login.module.scss';

class Login extends PureComponent {
  static propTypes = { setUser: PropTypes.func.isRequired }

  state = {
    email: '',
    password: '',
    repeatPassword: '',
    captcha: null,
    register: false,
    loading: false
  };

  onSubmit = (e) => {
    if (e) e.preventDefault();
    FORM_ELEMENTS.validate();
    const isValid = FORM_ELEMENTS.isValid();
    const { setUser } = this.props;
    const { register, captcha, ...userSettings } = this.state;

    if (captcha === null && register) toastr.error('Please fill the captcha');

    if (!isValid || (captcha === null && register)) return;

    setTimeout(() => {
      // register user
      if (register) {
        this.setState({ loading: true }, () => {
          registerUser(userSettings)
            .then(() => {
              toastr.success('Confirm registration',
                'You will receive an email shortly. Please confirm your registration.');
            })
            .catch(() => { toastr.error('Something went wrong'); })
            .then(() => { this.setState({ loading: false }); });
        });
      } else {
        // sign-in user
        loginUser(userSettings)
          .then((data) => {
            setUser(data);
            localStorage.setItem('userToken', data?.data?.token);
            // redirects the user to /admin once logged-in
            Router.push('/admin');
          })
          .catch((err) => {
            const { status, statusText } = err.response;

            const message = status === 401 ?
              'Your email and password combination is incorrect.' :
              `${status}:${statusText}`;

            toastr.error(message);
          });
      }
    }, 0);
  }

  render() {
    const {
      email,
      password,
      repeatPassword,
      register,
      loading
    } = this.state;

    return (
      <div className={styles['c-login']}>
        <div className={styles.content}>
          <div className={styles['log-in-container']}>
            {loading && <Spinner className="-light" isLoading />}
            <h2 className="c-title">{register ? 'Sign up' : 'Sign in'}</h2>

            <span>Access with your email</span>
            <form onSubmit={this.onSubmit}>
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.email = c; }}
                onChange={value => this.setState({ email: value })}
                className="-fluid"
                validations={['required', 'email']}
                properties={{
                  name: 'email',
                  label: 'Email',
                  required: true,
                  default: email,
                  placeholder: 'example@earthhq.org'
                }}
              >
                {Input}
              </Field>
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.password = c; }}
                onChange={value => this.setState({ password: value })}
                className="-fluid"
                validations={['required']}
                properties={{
                  name: 'password',
                  label: 'Password',
                  required: true,
                  default: password,
                  type: 'password',
                  placeholder: '*********'
                }}
              >
                {Input}
              </Field>
              {!register && (
                <Link href="forgot-password">
                  <a className={styles['forgot-password-link']}>Have you forgotten your password?</a>
                </Link>)}

              {register &&
                <Fragment>
                  <Field
                    ref={(c) => { if (c) FORM_ELEMENTS.elements.repeatPassword = c; }}
                    onChange={(value) => { this.setState({ repeatPassword: value }); }}
                    className="-fluid"
                    validations={['required', {
                      type: 'equal',
                      data: password,
                      condition: 'Passwords don\'t match'
                    }]}
                    properties={{
                      name: 'repeat-password',
                      label: 'Repeat Password',
                      required: true,
                      default: repeatPassword,
                      type: 'password',
                      placeholder: '*********'
                    }}
                  >
                    {Input}
                  </Field>
                  <div className="recaptcha-container">
                    <ReCAPTCHA
                      sitekey="6LeBy3YUAAAAACLNnSGCnvok_tRDnQut-Mc7SBh8"
                      onChange={(value) => { this.setState({ captcha: value }); }}
                    />
                  </div>
                </Fragment>
              }
              <div className="c-button-container form-buttons">
                <ul>
                  <li>
                    <button className="c-button -primary">
                      {register ? 'Register' : 'Log in'}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="c-button -tertirary"
                      onClick={() => { this.setState({ register: !register }); }}
                    >
                      {!register ? 'Register' : 'I have an account'}
                    </button>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
