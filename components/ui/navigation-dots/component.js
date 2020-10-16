import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classnames from 'classnames';

// styles
import styles from './navigation-dots.module.scss';

function NavigationDots(props) {
    const { items, route, selectedItemID } = props;
    const [selectedItem, setSelectedItem] = useState(items.find(item => item.id === selectedItemID));

    useEffect(() => {
        if (selectedItemID && items && items.length > 0) {
            console.log('selectedItemID', selectedItemID);
            const itemFound = items.find(i => i.id === selectedItemID);
            if (itemFound) {
                setSelectedItem(itemFound);
            }
        }
    }, [selectedItemID]);

    return (
        <nav className={styles['c-navigation-dots']}>
            <ul className={styles.dots}>
                {items.map(item => (
                    <Link href={`${route}#${item.id}`}>
                        <li
                            className={classnames({
                                [styles.dot]: true,
                                [styles['-selected']]: selectedItem?.id === item.id
                            })}
                            onClick={() => setSelectedItem(item)}
                        >
                            <a />
                        </li>
                    </Link>
                ))}
                <li className={styles.label}>
                    <span className={styles['label-text']}>{selectedItem?.label}</span>
                </li>
            </ul>
        </nav>
    );
}

NavigationDots.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItemID: PropTypes.string
};

export default NavigationDots;