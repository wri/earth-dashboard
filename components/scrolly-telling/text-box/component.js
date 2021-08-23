import PropTypes from 'prop-types';

// styles
import styles from './text-box.module.scss';

function TextBox(props) {
    const { text, imageHeader } = props;

    return (
        <div className={styles['c-text-box']}>
            <div className={styles['background']} />
            {!!imageHeader && 
                <div className={styles['image-header']}>
                    <img src={imageHeader} />
                </div>
            }
            <div className={styles.content}>
                <div className={styles['text-content']}>
                    {text}
                </div>
            </div>
        </div>
    );
}

TextBox.propTypes = {
    text: PropTypes.object.isRequired
};

export default TextBox;