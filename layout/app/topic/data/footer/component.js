import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './footer.module.scss';

function Footer() {
    const router = useRouter();
    

    return (
        <div className={classnames({
            [styles['c-topic-data-footer']]: true,
            [styles['-mobile']]: showMobileVersion
        })}>
            <div className={styles['main-container']}>
                {!showMobileVersion &&
                    <div
                        className={styles['logo-container']}
                        onClick={() => router.push('/')}
                    >
                        <img src="/static/images/logo-light.svg" />
                    </div>
                }
                <div className={styles['topic-links']}>
                    <div className={styles['link-container']}>
                        <Link href="/climate/data">
                            <a className={styles['climate-link']}>
                                CLIMATE
                            </a>
                        </Link>
                    </div>
                    <div className={styles['link-container']}>
                        <Link href="/forests/data">
                            <a className={styles['forests-link']}>
                                FORESTS
                            </a>
                        </Link>
                    </div>
                    <div className={styles['link-container']}>
                        <Link href="/freshwater/data">
                            <a className={styles['freshwater-link']}>
                                FRESHWATER
                            </a>
                        </Link>
                    </div>
                    <div className={styles['link-container']}>
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