import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classnames from 'classnames';

// styles
import styles from './navigation-dots.module.scss';

function NavigationDots(props) {
    const { items, route } = props;
    const [selectedItem, setSelectedItem] = useState(items[items.length - 1]);

    return (
        <nav className={styles['c-navigation-dots']}>
            <ul className={styles.dots}>
                {items.map(item => (
                    <Link href={`${route}#${item.id}`}>
                        <li
                            className={classnames({
                                [styles.dot]: true,
                                [styles['-selected']]: selectedItem.id === item.id
                            })}
                            onClick={() => setSelectedItem(item)}
                        >
                            <a />
                        </li>
                    </Link>
                ))}
                <li className={styles.label}>
                    <span className={styles['label-text']}>{selectedItem.label}</span>
                </li>
            </ul>
        </nav>
    );
}

NavigationDots.propTypes = { items: PropTypes.array.isRequired };

export default NavigationDots;