import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

function TextBox(props) {
    const { text } = props;

    return (
        <div className="c-text-box">
            {text}
        </div>
    );
}

TextBox.propTypes = {
    text: PropTypes.string.isRequired
};

export default TextBox;