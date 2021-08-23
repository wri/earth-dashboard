import PropTypes from 'prop-types';
import classnames from 'classnames';

// Next components
import Link from 'next/link';

function ButtonContainer(props) {
  const containerClassName = classnames({ [props.className]: !!props.className });

  return (
    <div className={`c-button-container ${containerClassName}`}>
      <ul>
        {this.props.buttons.map((button, i) => {
          const buttonClassName = classnames({ [button.className]: !!button.className });
          return (
            <li key={i}>
              <Link href={
                {
                  pathname: button.route,
                  query: button.params
                }}
              >
                <a className={`c-button ${buttonClassName}`}>
                  {button.label}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ButtonContainer.propTypes = {
  className: PropTypes.string
};

export default ButtonContainer;
