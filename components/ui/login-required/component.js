import { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";

// components
import Modal from "components/modal";
import LoginModal from "components/login";

class LoginRequired extends PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    clickCallback: PropTypes.func
  };

  static defaultProps = { clickCallback: null };

  state = { isOpen: false };

  promptLogin = e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ isOpen: true });
    if (this.props.clickCallback) {
      this.props.clickCallback();
    }
  };

  closePrompt = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { user, children } = this.props;
    const { isOpen } = this.state;

    return user.token ? (
      children
    ) : (
      <Fragment>
        <div className="c-login-required" onClickCapture={this.promptLogin}>
          {children}
        </div>
        <Modal isOpen={isOpen} onRequestClose={this.closePrompt}>
          <Login />
        </Modal>
      </Fragment>
    );
  }
}

export default LoginRequired;
