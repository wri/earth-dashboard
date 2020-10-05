import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/ui/icon';
import Spinner from 'components/ui/spinner';
import classnames from 'classnames';

// styles
import styles from './modal.module.scss';

export default class Modal extends React.Component {
  static propTypes = {
    // STORE
    open: PropTypes.bool,
    options: PropTypes.object,
    className: PropTypes.string,
    loading: PropTypes.bool,
    // ACTIONS
    toggleModal: PropTypes.func,
    setModalOptions: PropTypes.func,
    canClose: PropTypes.bool
  };

  static defaultProps = {
    open: false,
    canClose: true,
    options: {}
  };

  componentDidMount() {
    this.el.addEventListener('transitionend', () => {
      if (!this.props.open) {
        this.props.setModalOptions({ children: null });
      }
    });
  }

  // Close modal when esc key is pressed
  UNSAFE_componentWillReceiveProps({ open }) {
    const self = this;
    function escKeyPressListener(evt) {
      document.removeEventListener('keydown', escKeyPressListener);
      return evt.keyCode === 27 && self.props.toggleModal(false);
    }
    // if open property has changed
    if (this.props.open !== open) {
      document[open ? 'addEventListener' : 'removeEventListener']('keydown', escKeyPressListener);
    }
  }

  getContent() {
    return this.props.options.children ?
      <this.props.options.children {...this.props.options.childrenProps} /> : null;
  }

  render() {
    const { options, open, className, canClose } = this.props;
    
    return (
      <section
        ref={(node) => { this.el = node; }}
        className={classnames({
          [styles['c-modal']]: true,
          '-hidden': !open,
          [className]: !!className,
          [options.size]: !!options.size
        })}
      >
        <div className={styles['modal-container']}>
          {canClose &&
            <button 
              className={styles['modal-close']} 
              onClick={e => e.stopPropagation() || this.props.toggleModal(false)}
            >
              <Icon name="icon-cross" className="-small" />
            </button>
          }
          <div className={styles['modal-content']}>
            {this.props.children ? this.props.children : null}
            {this.props.loading ? <Spinner isLoading /> : this.getContent()}
          </div>
        </div>
        <div
          className={styles['modal-backdrop']}
          onClick={e => e.stopPropagation() || this.props.toggleModal(false)}
        />
      </section>
    );
  }
}
