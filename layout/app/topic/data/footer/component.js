import React from 'react';
import Link from 'next/link';

// styles
import styles from './footer.module.scss';

function Footer() {
    return (
        <div className={styles['c-topic-data-footer']}>
            <div className={styles['main-container']}>
                <div>LOGO</div>
                <div className={styles['topic-links']}>
                    <Link href="/climate/data">
                        <a className={styles['climate-link']}>
                            CLIMATE
                        </a>
                    </Link>
                    <Link href="/forests/data">
                        <a className={styles['forests-link']}>
                            FORESTS
                        </a>
                    </Link>
                    <Link href="/freshwater/data">
                        <a className={styles['freshwater-link']}>
                            FRESHWATER
                        </a>
                    </Link>
                    <Link href="/oceans/data">
                        <a className={styles['oceans-link']}>
                            OCEANS
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;