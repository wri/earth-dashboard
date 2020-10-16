import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// styles
import styles from './navigation-dots.module.scss';

function NavigationDots(props) {
    const { items } = props;
    const [selectedItem, setSelectedItem] = useState(items[0]);

    return (
        <nav className={styles['c-navigation-dots']}>
            <ul className={styles.dots}>
                {items.map(item => (
                    <Link href={`#${item.id}`}>
                        <li className={styles.dot}>
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