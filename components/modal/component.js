import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from 'react-modal';

// components
import Icon from 'components/ui/icon';

// styles
import styles from './modal2-overlay.module.scss';

class ModalComponent extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string,
    // Content
    children: PropTypes.node.isRequired,
    header: PropTypes.node,
    // Func
    onAfterOpen: PropTypes.func,
    onRequestClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    onAfterOpen: null,
    className: null,
    header: null
  };

  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      isOpen,
      className,
      header,
      onAfterOpen,
      onRequestClose
    } = this.props;
    const classNames = classnames({ 
      [styles['c-modal2']]: true,
      [className]: !!className 
    });
    return (
      <Modal
        className={classNames}
        overlayClassName={styles['c-modal2-overlay']}
        bodyOpenClassName="-no-scroll"
        isOpen={isOpen}
        ariaHideApp={false}
        {...onAfterOpen && { onAfterOpen }}
        onRequestClose={onRequestClose}
      >
        {header}

        <button
          className={styles['modal-close']}
          onClick={e => e.stopPropagation() || onRequestClose()}
        >
          <Icon name="icon-cross" className="-small" />
        </button>

        <div className={styles['modal-content']}>
          {this.props.children}
        </div>
      </Modal>
    );
  }
}

export default ModalComponent;
