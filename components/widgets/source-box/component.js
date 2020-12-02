import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './source-box.module.scss';

function SourceBox({ source }) {
    return (
        <div className={styles['c-source-box']}>
            {Array.isArray(source) && source.map((sourceObj) => {
                const sourcePrefix = sourceObj.prefix;
                const sourceSuffix = sourceObj.suffix;

                return (
                    <>
                        <div className={styles.prefix}>
                            {sourcePrefix?.link && sourcePrefix?.label && <a href={sourcePrefix?.link} target="_blank">{sourcePrefix?.label}</a>}
                            {!sourcePrefix?.link && sourcePrefix?.label && <span>{sourcePrefix?.label}</span>}
                        </div>
                        <div className={styles.suffix}>
                            {sourceSuffix?.link && sourceSuffix?.label && <a href={sourceSuffix?.link} target="_blank">({sourceSuffix?.label})</a>}
                            {!sourceSuffix?.link && sourceSuffix?.label && <span>{sourceSuffix?.label}</span>}
                        </div>
                    </>);
            })
            }
        </div>
    );
}

SourceBox.propTypes = { source: PropTypes.array.isRequired };

export default SourceBox;