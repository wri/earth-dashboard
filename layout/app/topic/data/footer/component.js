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

    const getMainContainerContent = (mobile = false) =>
        <>
            {!mobile &&
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
                    <Link href="/ocean/data">
                        <a className={styles['ocean-link']}>
                            OCEAN
                            </a>
                    </Link>
                </div>
            </div>
        </>;

    return (
        <div className={styles['c-topic-data-footer']}>
            <MediaContextProvider>
                <Desktop>
                    <div className={classnames({
                        [styles['main-container']]: true,
                        [styles['-desktop']]: true
                    })}>
                        {getMainContainerContent(false)}
                    </div>
                </Desktop>
                <Mobile>
                <div className={classnames({
                        [styles['main-container']]: true,
                        [styles['-mobile']]: true
                    })}>
                        {getMainContainerContent(true)}
                    </div>
                </Mobile>
            </MediaContextProvider>

        </div>
    );
}

export default Footer;