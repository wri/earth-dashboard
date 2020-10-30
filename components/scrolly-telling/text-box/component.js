import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './text-box.module.scss';

function TextBox(props) {
    const { text } = props;

    return (
        <div className={styles['c-text-box']}>
            <div className={styles['background']} />
            <div className={styles.content}>
                {text}
            </div>
        </div>
    );
}

TextBox.propTypes = {
    text: PropTypes.object.isRequired
};

export default TextBox;