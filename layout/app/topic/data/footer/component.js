import React from 'react';
import Link from 'next/link';

// styles
import styles from './footer.module.scss';

function Footer() {
    return (
        <div className={styles['c-topic-data-footer']}>
            <div className={styles['main-container']}>
                <img src="/static/images/logo-light.svg" />
                <div className={styles['topic-links']}>
                    <div>
                        <Link href="/climate/data">
                            <a className={styles['climate-link']}>
                                CLIMATE
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/forests/data">
                            <a className={styles['forests-link']}>
                                FORESTS
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/freshwater/data">
                            <a className={styles['freshwater-link']}>
                                FRESHWATER
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/oceans/data">
                            <a className={styles['oceans-link']}>
                                OCEANS
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;