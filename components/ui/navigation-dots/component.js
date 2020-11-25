import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classnames from 'classnames';

// styles
import styles from './navigation-dots.module.scss';

function NavigationDots(props) {
    const { items, route, selectedItemID, color, selectedColor } = props;
    const [selectedItem, setSelectedItem] = useState(items.find(item => item.id === selectedItemID));

    useEffect(() => {
        if (selectedItemID && items && items.length > 0) {
            const itemFound = items.find(i => i.id === selectedItemID);
            if (itemFound) {
                setSelectedItem(itemFound);
            }
        }
    }, [selectedItemID]);

    return (
        <nav className={styles['c-navigation-dots']}>
            <ul className={styles.dots}>
                {items.map(item => {
                    const isSelected = selectedItem?.id === item.id;
                    return (
                        <Link
                            key={`link-${item.id}`}
                            href={`${route}#${item.id}`}
                        >
                            <li
                                key={`link-li-${item.id}`}
                                className={classnames({
                                    [styles.dot]: true,
                                    [styles['-selected']]: isSelected
                                })}
                                onClick={() => setSelectedItem(item)}
                                {...(isSelected && color && { style: { backgroundColor: color }})}
                                {...(!isSelected && color && { style: { backgroundColor: color }})}
                            >
                                <a />
                            </li>
                        </Link>
                    );
                })}
                <li className={styles.label}>
                    <span 
                        className={styles['label-text']}
                        {...(color && { style: { color }})}
                    >
                        {selectedItem?.label}
                    </span>
                </li>
            </ul>
        </nav>
    );
}

NavigationDots.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItemID: PropTypes.string,
    color: PropTypes.string
};

NavigationDots.defaultProps = {
    color: '#7C90A2'
}

export default NavigationDots;