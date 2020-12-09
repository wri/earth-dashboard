import classnames from 'classnames';

// components
import PulsatingItem from 'components/ui/pulsating-item';

// utils
import { Desktop, Mobile, MediaContextProvider } from 'utils/responsive';

// styles
import styles from './climate-scrolly-telling.module.scss';

// data
import {
    CHART_AXES_1,
    CHART_AXES_2,
    CHART_AXES_3,
    CHART_AXES_1_MOBILE,
    CHART_AXES_2_MOBILE,
    CHART_AXES_3_MOBILE,
    getChartLinePresent,
    getChartLineFuture,
    getChartLineHistorical,
    getChartLineProjection
} from './data';

const getChartAxes = (number, mobile) => {
    if (mobile) {
        switch (number) {
            case 1: return CHART_AXES_1_MOBILE;
            case 2: return CHART_AXES_2_MOBILE;
            case 3: return CHART_AXES_3_MOBILE;
        }
    } else {
        switch (number) {
            case 1: return CHART_AXES_1;
            case 2: return CHART_AXES_2;
            case 3: return CHART_AXES_3;
        }
    }
}
const getClimateChartContents = (number, pulsatingItemData, linesData, mobile) =>
    <>
        {getChartAxes(number, mobile)}
        <img className={classnames({
            [styles['confidence-shape']]: true,
            [styles[`-scenario-${number}`]]: true,
            [styles['-mobile']]: mobile,
            [styles['-desktop']]: !mobile
        })}
            src={`/static/images/scrolly-telling/climate/confidence-${number}${mobile ? '-mobile' : ''}.svg`}
        />
        {linesData?.linePresent?.show && getChartLinePresent(linesData?.linePresent?.animate, mobile)}
        {linesData?.lineFuture?.show && getChartLineFuture(linesData?.lineFuture?.animate, mobile)}
        {linesData?.lineHistorical?.show && getChartLineHistorical(linesData?.lineHistorical?.animate, mobile)}
        {linesData?.lineProjection?.show && getChartLineProjection(linesData?.lineProjection?.animate, mobile)}
        {pulsatingItemData?.show &&
            <div
                className={styles.marker}
                style={{
                    top: mobile ? pulsatingItemData?.mobile?.top : pulsatingItemData?.desktop?.top,
                    left: mobile ? pulsatingItemData?.mobile?.left : pulsatingItemData?.desktop?.left,
                }}
            >
                <PulsatingItem level={pulsatingItemData?.level} />
            </div>
        }
    </>;
const getClimateChart = (number, pulsatingItemData, linesData) =>
    <MediaContextProvider>
        <Desktop className={classnames({
            [styles['climate-chart']]: true,
            [styles['-desktop']]: true
        })}>
            {getClimateChartContents(number, pulsatingItemData, linesData, false)}
        </Desktop>
        <Mobile className={classnames({
            [styles['climate-chart']]: true,
            [styles['-mobile']]: true
        })}>
            {getClimateChartContents(number, pulsatingItemData, linesData, true)}
        </Mobile>
    </MediaContextProvider>;

const getVisualSource = () =>
    <>
        <a href="https://www.ipcc.ch/site/assets/uploads/2018/02/WG1AR5_Chapter12_FINAL.pdf" target="_blank">IPCC</a>,
        <a href="https://pdfs.semanticscholar.org/3024/6fe51fca5cd4f25eb56999b9dbe163e53014.pdf?_ga=2.229101076.980227755.1605691335-447938515.1605691335" target="_blank">Schurer et al.</a>
    </>;
const getVisualDataset = () => <a href="https://www.ipcc.ch/site/assets/uploads/2018/02/WG1AR5_Chapter12_FINAL.pdf" target="_blank">Figure 12.5 IPCC</a>


export const CLIMATE_STEPS = [
    {
        index: 0,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Methodology</h6>
                    <p>
                        Explore this chart to <span className="bold">see the impact of global average temperature levels</span> in the past, present
                     and future. Even a half degree can make a big difference to sea level rise, the frequency
                      of deadly heat waves, the spread of malaria or the survival of coral reefs.
                    </p>
                    <p>
                        This narrative depicts RCP 6.0, one of four different scenarios or “Representative Concentration
                        Pathways,“ that describe possible trajectories for carbon dioxide emissions and resulting
                         temperature increases. <span className="bold">RCP 6.0 is <a className="external-link -climate bold" href="https://link.springer.com/article/10.1007/s10584-011-0148-z" target="_blank">midway between optimistic and pessimistic projections</a></span>.
                    </p>
                    <p>
                        Under this scenario, <span className="bold">countries do not continue business as usual and take some, but not enough,
                        steps to curb emissions and mitigate climate change</span>.
                    </p>
                </>
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)',
        stickyContainerElement: getClimateChart(1,
            {
                show: true,
                level: 1,
                desktop: {
                    top: '274px',
                    left: '537px'
                },
                mobile: {
                    top: '275px',
                    left: '243px'
                }
            },
            {
                linePresent: { show: true, animate: true },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: false, animate: false },
                lineProjection: { show: false, animate: false }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 1,
        textPanel: {
            text: <p>
                A <span className="bold">1.0 °C temperature increase</span> might not seem like much, but let’s take a look at the implications for
                the Earth’s global commons. <span className="bold">These events are not far into the future, but already happening now</span>.
            </p>
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)',
        stickyContainerElement: getClimateChart(1,
            {
                show: true,
                level: 1,
                desktop: {
                    top: '274px',
                    left: '537px'
                },
                mobile: {
                    top: '275px',
                    left: '243px'
                }
            },
            {
                linePresent: { show: true, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: false, animate: false },
                lineProjection: { show: false, animate: false }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 2,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Fires</h6>
                    <p>
                        In Australia, last season, fires consumed an area larger than South Korea
                        and <a className="external-link -climate" href="https://www.insider.com/australia-fires-burned-twice-land-area-as-2019-amazon-fires-2020-1 https://www.bbc.com/news/world-australia-53549936#:~:text=Nearly%20three%20billion%20animals%20were," target="_blank"><span className="bold">killed or harmed 3 billion animals</span></a>.
                    </p>
                    <p className="photo-subtitle">Photo by Peter Buschmann on Wikimedia Commons (Public domain)</p>
                </>,
            imageHeader: "/static/images/scrolly-telling/climate/fires.jpg"
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)',
        stickyContainerElement: getClimateChart(1,
            {
                show: true,
                level: 1,
                desktop: {
                    top: '274px',
                    left: '537px'
                },
                mobile: {
                    top: '275px',
                    left: '243px'
                }
            },
            {
                linePresent: { show: true, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: false, animate: false },
                lineProjection: { show: false, animate: false }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 3,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Melting Ice</h6>
                    <p>
                        <a className="external-link -climate bold" href="https://www.climate.gov/news-features/understanding-climate/climate-change-glacier-mass-balance" target="_blank">Between 1980 and 2018, glaciers lost ice equivalent to cutting a 24-meter</a> (79-foot) thick slice of
                         each one. Among these are Himalayan <span className="bold">glaciers that provide water to some <a className="external-link -climate bold" href="https://www.nationalgeographic.com/environment/2019/02/himalaya-mountain-climate-change-report/" target="_blank">240 million people</a></span>.
                    </p>
                    <p className="photo-subtitle">Photo by NOAA on Unsplash</p>
                </>,
            imageHeader: "/static/images/scrolly-telling/climate/melting-ice.jpg"
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)',
        stickyContainerElement: getClimateChart(1,
            {
                show: true,
                level: 1,
                desktop: {
                    top: '274px',
                    left: '537px'
                },
                mobile: {
                    top: '275px',
                    left: '243px'
                }
            },
            {
                linePresent: { show: true, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: false, animate: false },
                lineProjection: { show: false, animate: false }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 4,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Human Displacement and Conflict</h6>
                    <p>
                        According to the European Parliament, an average of <a className="external-link -climate bold" href="https://www.internal-displacement.org/publications/global-estimates-2015-people-displaced-by-disasters" target="_blank">26.4 million people around the world have
                        been displaced</a> by weather events every year since 2008.
                    </p>
                    <p className="photo-subtitle">Photo: Public Domain on Wikimedia Commons</p>
                </>,
            imageHeader: "/static/images/scrolly-telling/climate/human-displacement-and-conflict.jpg"
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)',
        stickyContainerElement: getClimateChart(1,
            {
                show: true,
                level: 1,
                desktop: {
                    top: '274px',
                    left: '537px'
                },
                mobile: {
                    top: '275px',
                    left: '243px'
                }
            },
            {
                linePresent: { show: true, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: false, animate: false },
                lineProjection: { show: false, animate: false }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 5,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Projecting Into the Future</h6>
                    <p>
                        Predicting the future is hard, so scientists use <span className="bold">confidence intervals</span>, which are minimum
                        and maximum estimates between which the actual temperatures might fluctuate.
                        These are represented by the gray area on the chart. The dotted orange line represents
                         the mean values between those intervals.
                    </p>
                </>
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)',
        stickyContainerElement: getClimateChart(2,
            {
                show: true,
                level: 1,
                desktop: {
                    top: '274px',
                    left: '537px'
                },
                mobile: {
                    top: '275px',
                    left: '243px'
                }
            },
            {
                linePresent: { show: true, animate: false },
                lineFuture: { show: true, animate: true },
                lineHistorical: { show: false, animate: false },
                lineProjection: { show: false, animate: false }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 6,
        textPanel: {
            text:
                <>
                    <p>
                        <span className="bold">Let’s look at the impacts of a warmer climate...</span>.
                    </p>
                </>
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)',
        stickyContainerElement: getClimateChart(2,
            {
                show: true,
                level: 1,
                desktop: {
                    top: '274px',
                    left: '537px'
                },
                mobile: {
                    top: '275px',
                    left: '243px'
                }
            },
            {
                linePresent: { show: true, animate: false },
                lineFuture: { show: true, animate: true },
                lineHistorical: { show: false, animate: false },
                lineProjection: { show: false, animate: false }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 7,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Drought</h6>
                    <p>
                        According to the IPCC, <a className="external-link -climate" href="https://www.nytimes.com/2018/10/07/climate/ipcc-climate-report-2040.html" target="_blank"><span className="bold">350 million more urban residents would face severe drought</span></a>.
                    </p>
                    <p>
                        The average drought would be two months longer
                        and <a className="external-link -climate bold" href="https://interactive.carbonbrief.org/impacts-climate-change-one-point-five-degrees-two-degrees/?utm_source=web&utm_campaign=Redirect" target="_blank">271 million more people</a><span className="bold"> will be exposed to water scarcity</span>.

                    </p>
                    <p className="photo-subtitle">Photo by Mike Erskine on Unsplash</p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/drought.jpg'
        },
        showYearCounter: true,
        previousYearValue: 2020,
        yearValue: 2034,
        previousDegrees: 1,
        degrees: 1.5,
        yearSubtitle: 'In less than 20 years',
        yearBackgroundColor: 'hsl(20, 100%, 48%)',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 2,
                desktop: {
                    top: '287px',
                    left: '273px'
                },
                mobile: {
                    top: '258px',
                    left: '137px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 8,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Biodiversity</h6>
                    <p>
                        At 1.5°C, <a className="external-link -climate bold" href="https://www.insider.com/australia-fires-burned-twice-land-area-as-2019-amazon-fires-2020-1 https://www.bbc.com/news/world-australia-53549936#:~:text=Nearly%20three%20billion%20animals%20were," target="_blank">6% of insects, 8% of plants and 4% of vertebrates</a> are projected
                        to lose over half of their geographic range.
                    </p>
                    <p className="photo-subtitle">Photo by Ray Hennessy on Unsplash</p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/biodiversity.jpg'
        },
        showYearCounter: true,
        yearValue: 2034,
        degrees: 1.5,
        yearSubtitle: 'In less than 20 years',
        yearBackgroundColor: 'hsl(20, 100%, 48%)',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 2,
                desktop: {
                    top: '287px',
                    left: '273px'
                },
                mobile: {
                    top: '258px',
                    left: '137px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 9,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Flooding</h6>
                    <p>
                        <a className="external-link -climate" href="https://iopscience.iop.org/article/10.1088/1748-9326/aacc76/meta" target="_blank"><span className="bold">Annual flood losses would reach $10.2 trillion</span></a> if no further adaptation is undertaken.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Basile Morin on Wikimedia
                     Commons <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(cc-by-4.0)</a>
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/flooding.png'
        },
        showYearCounter: true,
        yearValue: 2034,
        degrees: 1.5,
        yearSubtitle: 'In less than 20 years',
        yearBackgroundColor: 'hsl(20, 100%, 48%)',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 2,
                desktop: {
                    top: '287px',
                    left: '273px'
                },
                mobile: {
                    top: '258px',
                    left: '137px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 10,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Human Displacement and Conflict</h6>
                    <p>
                        An estimated 1.5 billion people or <a className="external-link -climate" href="https://www.pnas.org/content/117/21/11350" target="_blank"><span className="bold">13% of the projected global population would be living in inhabitable climates</span></a> and
                        would have to migrate.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Julie Ricard on Unsplash
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/human-displacement-and-conflict-second.jpg'
        },
        showYearCounter: true,
        yearValue: 2034,
        degrees: 1.5,
        yearSubtitle: 'In less than 20 years',
        yearBackgroundColor: 'hsl(20, 100%, 48%)',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 2,
                desktop: {
                    top: '287px',
                    left: '273px'
                },
                mobile: {
                    top: '258px',
                    left: '137px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 11,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Coral Reefs</h6>
                    <p>
                        Ocean warming, acidification and more intense storms would
                        cause <span className="bold">coral reefs to decline by </span><a className="external-link -climate bold" href="https://climate.nasa.gov/news/2865/a-degree-of-concern-why-global-temperatures-matter/#:~:text=If%20warming%20reaches%202%20degrees,on%20humans%20and%20ecological%20systems" target="_blank">70 to 90 percent</a>.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Julie Ricard on Unsplash
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/coral-reefs.jpg'
        },
        showYearCounter: true,
        yearValue: 2034,
        degrees: 1.5,
        yearSubtitle: 'In less than 20 years',
        yearBackgroundColor: 'hsl(20, 100%, 48%)',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 2,
                desktop: {
                    top: '287px',
                    left: '273px'
                },
                mobile: {
                    top: '258px',
                    left: '137px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 12,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Extreme rainfall</h6>
                    <p>
                        <a className="external-link -climate bold" href="https://interactive.carbonbrief.org/impacts-climate-change-one-point-five-degrees-two-degrees/?utm_source=web&utm_campaign=Redirect" target="_blank">Annual losses from flood damage and sea level rise would
                        reach $11.7 trillion</a> if no further adaptation is undertaken.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Saikiran Kesari on Unsplash
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/extreme-rainfall.jpg'
        },
        showYearCounter: true,
        previousYearValue: 2034,
        yearValue: 2058,
        previousDegrees: 1.5,
        degrees: 2.0,
        yearSubtitle: 'In less than 40 years',
        yearBackgroundColor: '#DB1600',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 3,
                desktop: {
                    top: '255px',
                    left: '450px'
                },
                mobile: {
                    top: '206px',
                    left: '204px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 13,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Heatwaves and Water Scarcity</h6>
                    <p>
                        <a className="external-link -climate bold" href="https://interactive.carbonbrief.org/impacts-climate-change-one-point-five-degrees-two-degrees/?utm_source=web&utm_campaign=Redirect" target="_blank">More than a third of the world’s population</a> would face the risk of
                        a <span className="bold">heatwave every 5 years</span>.
                    </p>
                    <p>
                        The deadly heat waves like what India and Pakistan endured in 2015 <a className="external-link -climate bold" href="https://climate.nasa.gov/news/2865/a-degree-of-concern-why-global-temperatures-matter/#:~:text=If%20warming%20reaches%202%20degrees,on%20humans%20and%20ecological%20systems." target="_blank">could occur annually</a>.
                    </p>
                    <p>
                        <span className="bold">Water scarcity would threaten <a className="external-link -climate" href="https://interactive.carbonbrief.org/impacts-climate-change-one-point-five-degrees-two-degrees/?utm_source=web&utm_campaign=Redirect" target="_blank">388 million more people</a></span> around the world
                    </p>
                    <p className="photo-subtitle">
                        Photo by Jotpe on Wikimedia Commons <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(cc-by-4.0)</a>
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/heatwaves-and-water-scarcity.jpg'
        },
        showYearCounter: true,
        yearValue: 2058,
        degrees: 2.0,
        yearSubtitle: 'In less than 40 years',
        yearBackgroundColor: '#DB1600',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 3,
                desktop: {
                    top: '255px',
                    left: '450px'
                },
                mobile: {
                    top: '206px',
                    left: '204px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 14,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Sea Ice and Permafrost</h6>
                    <p>
                        The Arctic Ocean would be sea <a className="external-link -climate bold" href="https://climate.nasa.gov/news/2865/a-degree-of-concern-why-global-temperatures-matter/#:~:text=If%20warming%20reaches%202%20degrees,on%20humans%20and%20ecological%20systems." target="_blank">ice-free one summer per decade</a>.
                    </p>
                    <p>
                        An estimated <span className="bold"><a className="external-link -climate" href="https://www.nature.com/articles/s41467-020-16357-8 " target="_blank">40% of permafrost area would thaw</a>, releasing its carbon and methane</span> into the atmosphere.
                    </p>
                    <p>
                        <a className="external-link -climate bold" href="https://e360.yale.edu/features/how-melting-permafrost-is-beginning-to-transform-the-arctic" target="_blank">Permafrost stores twice as much carbon</a> as currently contained in the atmosphere.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Boris Radosavljevic on Flickr <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank">(cc-by-2.0)</a>
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/sea-ice-and-permafrost.jpg'
        },
        showYearCounter: true,
        yearValue: 2058,
        degrees: 2.0,
        yearSubtitle: 'In less than 40 years',
        yearBackgroundColor: '#DB1600',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 3,
                desktop: {
                    top: '255px',
                    left: '450px'
                },
                mobile: {
                    top: '206px',
                    left: '204px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 15,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Biodiversity</h6>
                    <p>
                        A projected <a className="external-link -climate" href="https://www.ipcc.ch/sr15/chapter/spm/" target="_blank"><span className="bold">18% of insects, 16% of plants and 8% of vertebrates</span></a> would
                        lose over half of their geographic range.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Edson Maciel on Unsplash
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/biodiversity-second.jpg'
        },
        showYearCounter: true,
        yearValue: 2058,
        degrees: 2.0,
        yearSubtitle: 'In less than 40 years',
        yearBackgroundColor: '#DB1600',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 3,
                desktop: {
                    top: '255px',
                    left: '450px'
                },
                mobile: {
                    top: '206px',
                    left: '204px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 16,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Human Displacement and Conflict</h6>
                    <p>
                        Climate has played a role in between <a className="external-link -climate bold" href="https://news.stanford.edu/2019/06/12/climate-change-cause-armed-conflict/" target="_blank">3 and 20 percent of armed conflicts</a>
                        over the last century and that share will climb.
                    </p>
                    <p>
                        At 2°C of warming <span className="bold">the likelihood of climate contributing to <a className="external-link -climate" href="https://news.stanford.edu/2019/06/12/climate-change-cause-armed-conflict/" target="_blank">conflicts would more than double</a></span>.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Ggia on Wikimedia Commons <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(cc-by-4.0)</a>
                    </p>
                </>
            ,
            imageHeader: '/static/images/scrolly-telling/climate/human-displacement-and-conflict-third.jpg'
        },
        showYearCounter: true,
        yearValue: 2058,
        degrees: 2.0,
        yearSubtitle: 'In less than 40 years',
        yearBackgroundColor: '#DB1600',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 3,
                desktop: {
                    top: '255px',
                    left: '450px'
                },
                mobile: {
                    top: '206px',
                    left: '204px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 17,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Sea ice</h6>
                    <p>
                        The likelihood of ice free summer in the arctic would rise to <a className="external-link -climate" href="https://interactive.carbonbrief.org/impacts-climate-change-one-point-five-degrees-two-degrees/?utm_source=web&utm_campaign=Redirect" target="_blank"><span className="bold">63% each year</span></a>.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Derek Oyen on Unsplash
                </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/sea-ice.jpg'
        },
        showYearCounter: true,
        previousYearValue: 2058,
        yearValue: 2095,
        previousDegrees: 2.0,
        degrees: 3.0,
        yearSubtitle: 'In less than 80 years',
        yearBackgroundColor: '#AD0000',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 4,
                desktop: {
                    top: '188px',
                    left: '747px'
                },
                mobile: {
                    top: '103px',
                    left: '329px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 18,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Human Migration and Conflict</h6>
                    <p>
                        <a className="external-link -climate bold" href="https://www.pnas.org/content/117/21/11350" target="_blank">Three out of 10 people</a> in the world (2-3 billion) would be living in uninhabitable
                        climates and would have to migrate.
                    </p>
                    <p className="photo-subtitle">
                        Photo by thekirbster on Flickr <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank">(cc-by-2.0)</a>
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/human-displacement-and-conflict-fourth.jpg'
        },
        showYearCounter: true,
        yearValue: 2095,
        degrees: 3.0,
        yearSubtitle: 'In less than 80 years',
        yearBackgroundColor: '#AD0000',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 4,
                desktop: {
                    top: '188px',
                    left: '747px'
                },
                mobile: {
                    top: '103px',
                    left: '329px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    },
    {
        index: 19,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Biodiversity</h6>
                    <p>
                        The suitable habitat for <a className="external-link -climate bold" href="https://link.springer.com/article/10.1007/s10584-019-02420-x#:~:text=For%20example%2C%20at%203%20%C2%B0,rise%20in%20global%20mean%20temperature " target="_blank">species would plummet on average by half</a>.
                    </p>
                    <p className="photo-subtitle">
                        Photo: Andrés Medina on Unsplash
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/biodiversity-third.jpg'
        },
        showYearCounter: true,
        yearValue: 2095,
        degrees: 3.0,
        yearSubtitle: 'In less than 80 years',
        yearBackgroundColor: '#AD0000',
        stickyContainerElement: getClimateChart(3,
            {
                show: true,
                level: 4,
                desktop: {
                    top: '188px',
                    left: '747px'
                },
                mobile: {
                    top: '103px',
                    left: '329px'
                }
            },
            {
                linePresent: { show: false, animate: false },
                lineFuture: { show: false, animate: false },
                lineHistorical: { show: true, animate: true },
                lineProjection: { show: true, animate: true }
            }),
        visualSource: getVisualSource(),
        visualDataset: getVisualDataset()
    }
];

export const CLIMATE_CLOCK_STEPS = [
    {
        index: 0,
        textPanel: {
            text:
                <>
                    <h6 className="climate">The Climate Clock</h6>
                    <p>
                        The Climate Clock shows a timer, <span className="bold">counting down how long it will take to burn
                        through our “carbon budget”</span> — the amount of CO<sub>2</sub> that can still be released
                        into the atmosphere while limiting global warming to 1.5°C (or 34.7 °F) above pre-industrial
                         levels.  It projects a 2017 emissions rate into the future and calculates that <a className="bold external-link -climate" href="https://www.mcc-berlin.net/en/index.html" target="_blank">holding
                          emissions to 420 Gt of CO<sub>2</sub> emissions gives us a 67% chance of staying within the threshold of 1.5°C</a>.
                    </p>
                </>
        },
        visualSource: <a href="https://www.mcc-berlin.net/en/research/co2-budget.html" target="_blank">MCC</a>,
        visualDataset: <a href="https://www.ipcc.ch/sr15/" target="_blank">IPCC</a>
    },
    {
        index: 1,
        textPanel: {
            text:
                <>
                    <p>
                        The warming rate may not be linear.  Uncertainties explain why climate scientists see only
                        a 67% likelihood of staying at 1.5°C. Melting permafrost and ice sheets, degraded forests,
                        and disrupted ocean currents, could create tipping points that could change the climate
                        dramatically and irreversibly.
                    </p>
                    <p><span className="bold">Emissions have risen since 2017, which could mean we have
                          less time</span> than the clock says. Temperature climbs after increases in atmospheric CO<sub>2</sub>,
                          so we would not feel the full impact of exceeding the carbon budget right away.
                           This clock follows the <a className="external-link -climate bold" href="https://www.mcc-berlin.net/en/index.html" target="_blank">methodology from the Mercator Research Institute on Global Commons
                            and Climate Change (MCC)</a> using data from the <a className="external-link -climate bold" href="https://www.ipcc.ch/sr15/" target="_blank">IPCC Special Report on Global Warming of 1.5°C</a>.
                    </p>
                </>
        },
        visualSource: <a href="https://www.mcc-berlin.net/en/research/co2-budget.html" target="_blank">MCC</a>,
        visualDataset: <a href="https://www.ipcc.ch/sr15/" target="_blank">IPCC</a>
    }
];
