import { PureComponent } from "react";
import PropTypes from "prop-types";
import { toastr } from "react-redux-toastr";
import Router from "next/router";
import classnames from "classnames";

// components
import Field from "components/form/Field";
import Input from "components/form/Input";
import Spinner from "components/ui/spinner";

// services
import { loginUser } from "services/user";

// constants
import { FORM_ELEMENTS } from "./constants";

// styles
import styles from "./login.module.scss";

class Login extends PureComponent {
  static propTypes = { setUser: PropTypes.func.isRequired };

  state = {
    email: "",
    password: "",
    loading: false
  };

  onSubmit = e => {
    if (e) e.preventDefault();
    FORM_ELEMENTS.validate();
    const isValid = FORM_ELEMENTS.isValid();
    const { setUser } = this.props;
    const { captcha, ...userSettings } = this.state;

    if (!isValid) return;

    setTimeout(() => {
      // sign-in user
      loginUser(userSettings)
        .then(data => {
          setUser({
            ...data?.data,
            token: `Bearer ${data?.data.token}`
          });
          localStorage.setItem("userToken", data?.data?.token);
          // redirects the user to /admin once logged-in
          Router.push("/admin/data/datasets");
        })
        .catch(err => {
          const { status, statusText } = err.response;

          const message =
            status === 401 ? "Your email and password combination is incorrect." : `${status}:${statusText}`;

          toastr.error(message);
        });
    }, 0);
  };

  render() {
    const { email, password, loading } = this.state;

    return (
      <div className={styles["c-login"]}>
        <div className={styles.content}>
          <div className={styles["log-in-container"]}>
            {loading && <Spinner className="-light" isLoading />}
            <h2 className="c-title">Sign in</h2>
            <form onSubmit={this.onSubmit}>
              <Field
                ref={c => {
                  if (c) FORM_ELEMENTS.elements.email = c;
                }}
                onChange={value => this.setState({ email: value })}
                className="-fluid"
                validations={["required", "email"]}
                properties={{
                  name: "email",
                  label: "Email",
                  required: true,
                  default: email,
                  placeholder: "example@earthhq.org"
                }}
              >
                {Input}
              </Field>
              <Field
                ref={c => {
                  if (c) FORM_ELEMENTS.elements.password = c;
                }}
                onChange={value => this.setState({ password: value })}
                className="-fluid"
                validations={["required"]}
                properties={{
                  name: "password",
                  label: "Password",
                  required: true,
                  default: password,
                  type: "password",
                  placeholder: "*********"
                }}
              >
                {Input}
              </Field>
              <div
                className={classnames({
                  "c-button-container": true,
                  [styles["form-buttons"]]: true
                })}
              >
                <button className={styles["log-in-button"]}>Log in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
