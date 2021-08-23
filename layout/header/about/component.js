import classnames from 'classnames';

// utils
import { logEvent } from 'utils/gtag';

// styles
import styles from './about.module.scss';

function About() {
    const logPartnerClick = (partnerURL) =>
        logEvent({
            category: 'Outbound traffic',
            action: 'Click on partner logo',
            label: partnerURL
        });

    return (
        <div className={styles['c-about']}>
            <p>
                We created the Earth Dashboard as a “Situation Room” for the planet.  It is an interactive platform that tracks the forces imperiling the natural systems that support life on earth. It presents a constant flow of reliable, accessible scientific data on what can and must be done to protect the global commons – vital resources and ecosystems – and confront an accelerating planetary emergency.
            </p>
            <p>
                The Earth Dashboard is a joint project of the <a className="external-link -white" target="_blank" href="https://globalcommonsalliance.org/" >Global Commons Alliance</a>, the
                largest coalition of scientific and conservation organizations,
                 and <a className="external-link -white" target="_blank" href="https://resourcewatch.org/" >Resource Watch</a>, an open
                 source platform which compiles hundreds of visualized data sets from the world’s most
                 reliable sources, in partnership with popular environmental news
                 site <a className="external-link -white" target="_blank" href="https://news.mongabay.com/" >Mongabay</a>, and leading
                 digital news distributer <a className="external-link -white" target="_blank" href="https://nowthisnews.com/earth" >NowThis Earth</a>.
                 It offers activists, the media, policymakers, business leaders and the public a unique tool – a way to find
                 vital information, monitor the latest developments, set priorities, and take action.  It is designed
                 to be comprehensive, detailed, transparent, open source, and easy to share. The facts and findings on
                 the Earth Dashboard provide a true picture of the potentially irreversible damage humans are causing and
                 the thresholds we are approaching. It applies the same rigorous scholarship and reporting to the question
                  of what can be done. By sharing collective expertise and effective strategies it aims to help avert
                  catastrophic change and safeguard a resilient, stable planet.
            </p>
            <p>
                By using this site, you consent to the Resource Watch <a className="external-link -white" href="https://resourcewatch.org/privacy-policy" target="_blank">Privacy Policy</a> and <a className="external-link -white" href="https://resourcewatch.org/terms-of-service" target="_blank">Terms of Service</a>.
            </p>
            <div className={classnames({
                [styles['logos-container']]: true,
                'row': true
            })}>
                <div className={classnames({
                    [styles['logo']]: true,
                    'column small-12 medium-6': true
                })}>
                    <a 
                        target="_blank" 
                        href="https://globalcommonsalliance.org/"
                        onClick={() => logPartnerClick('https://globalcommonsalliance.org/')}
                    >
                        <img src="/static/images/about/logo_GCA.svg" />
                    </a>
                </div>
                <div className={classnames({
                    [styles['logo']]: true,
                    'column small-12 medium-6': true
                })}>
                    <a 
                        target="_blank"
                        href="https://resourcewatch.org/"
                        onClick={() => logPartnerClick('https://resourcewatch.org/')}
                    >
                        <img src="/static/images/about/logo_RW.svg" />
                    </a>
                </div>
                <div className={classnames({
                    [styles['logo']]: true,
                    'column small-12 medium-6': true
                })}>
                    <a
                        target="_blank"
                        href="https://news.mongabay.com/"
                        onClick={() => logPartnerClick('https://news.mongabay.com/')}
                    >
                        <img src="/static/images/about/logo-mongabay.png" />
                    </a>
                </div>
                <div className={classnames({
                    [styles['logo']]: true,
                    'column small-12 medium-6': true
                })}>
                    <a
                        target="_blank"
                        href="https://nowthisnews.com/earth"
                        onClick={() => logPartnerClick('https://nowthisnews.com/earth')}
                    >
                        <img src="/static/images/about/logo_nowthis.svg" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default About;