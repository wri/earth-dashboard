import classnames from 'classnames';

// styles
import styles from './climate-scrolly-telling.module.scss';

export const CLIMATE_STEPS = [
    {
        index: 0,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Methodology</h6>
                    <p>
                        Explore this chart to <strong>see the impact of global average temperature levels</strong> in the past, present
                     and future. Even a half degree can make a big difference to sea level rise, the frequency
                      of deadly heat waves, the spread of malaria or the survival of coral reefs.
                    </p>
                    <p>
                        This narrative depicts RCP 6.0, one of four different scenarios or “Representative Concentration
                        Pathways,“ that describe possible trajectories for carbon dioxide emissions and resulting
                         temperature increases. <strong>RCP 6.0 is midway between optimistic and pessimistic projections</strong>.
                    </p>
                    <p>
                        Under this scenario, <strong>countries do not continue business as usual and take some, but not enough,
                        steps to curb emissions and mitigate climate change</strong>.
                    </p>
                </>
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)'
    },
    {
        index: 1,
        textPanel: {
            text: <p>
                A <strong>1.0 °C temperature increase</strong> might not seem like much, but let’s take a look at the implications for
                the Earth’s global commons. <strong>These events are not far into the future, but already happening now</strong>.
            </p>
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)'
    },
    {
        index: 2,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Fires</h6>
                    <p>
                        In Australia, last season, fires consumed an area larger than South Korea
                        and <a className="external-link -climate" href="https://www.insider.com/australia-fires-burned-twice-land-area-as-2019-amazon-fires-2020-1 https://www.bbc.com/news/world-australia-53549936#:~:text=Nearly%20three%20billion%20animals%20were," target="_blank"><strong>killed or harmed 3 billion animals</strong></a>.
                    </p>
                    <p className="photo-subtitle">Photo by Peter Buschmann on Wikimedia Commons (Public domain)</p>
                </>,
            imageHeader: "/static/images/scrolly-telling/climate/fires.jpg"
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)'
    },
    {
        index: 3,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Melting Ice</h6>
                    <p>
                        Between 1980 and 2018, glaciers lost ice equivalent to cutting a 24-meter (79-foot) thick slice of
                         each one. Among these are Himalayan <strong>glaciers that provide water to some 240 million people</strong>.
                    </p>
                    <p className="photo-subtitle">Photo by NOAA on Unsplash</p>
                </>,
            imageHeader: "/static/images/scrolly-telling/climate/melting-ice.jpg"
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)'
    },
    {
        index: 4,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Human Displacement and Conflict</h6>
                    <p>
                        According to the European Parliament, an average of <strong>26.4 million people around the world have
                        been displaced</strong> by weather events every year since 2008.
                    </p>
                    <p className="photo-subtitle">Photo: Public Domain on Wikimedia Commons</p>
                </>,
            imageHeader: "/static/images/scrolly-telling/climate/human-displacement-and-conflict.jpg"
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)'
    },
    {
        index: 5,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Projecting Into the Future</h6>
                    <p>
                        Predicting the future is hard, so scientists use <strong>confidence intervals</strong>, which are minimum 
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
        yearBackgroundColor: 'hsl(41, 100%, 48%)'
    },
    {
        index: 6,
        textPanel: {
            text:
                <>
                    <p>
                        <strong>Let’s zoom into the future...</strong>.
                    </p>
                    <p>
                        At current rates of warming the world will reach 1.5°C above pre-industrial levels <strong>between
                         2023 and 2055</strong>. Keeping it from rising more would require us to cut carbon emissions
                         sharply beginning now and zero them out by the middle of this century. <strong>An increase
                         of 2°C is more likely</strong>.
                    </p>
                </>
        },
        showYearCounter: true,
        yearValue: 2020,
        degrees: 1,
        yearSubtitle: 'Present time',
        yearBackgroundColor: 'hsl(41, 100%, 48%)'
    },
    {
        index: 7,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Drought</h6>
                    <p>
                        According to the IPCC, <a className="external-link -climate" href="https://www.nytimes.com/2018/10/07/climate/ipcc-climate-report-2040.html" target="_blank"><strong>350 million more urban residents would face severe drought</strong></a>.
                    </p>
                    <p>
                        The average drought would be two months longer 
                        and <a className="external-link -climate" href="https://interactive.carbonbrief.org/impacts-climate-change-one-point-five-degrees-two-degrees/?utm_source=web&utm_campaign=Redirect" target="_blank"><strong>271 million more people will be exposed to water scarcity</strong></a>.

                    </p>
                    <p className="photo-subtitle">Photo by Mike Erskine on Unsplash</p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/drought.jpg'
        },
        showYearCounter: true,
        previousYearValue: 2020,
        yearValue: 2046,
        previousDegrees: 1,
        degrees: 1.5,
        yearSubtitle: 'In less than 30 years',
        yearBackgroundColor: 'hsl(20, 100%, 48%)'
    },
    {
        index: 8,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Biodiversity</h6>
                    <p>
                        At 1.5°C, <strong>6% of insects, 8% of plants and 4% of vertebrates</strong> are projected 
                        to lose over half of their geographic range.
                    </p>
                    <p className="photo-subtitle">Photo by Ray Hennessy on Unsplash</p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/biodiversity.jpg'
        },
        showYearCounter: true,
        yearValue: 2046,
        degrees: 1.5,
        yearSubtitle: 'In less than 30 years',
        yearBackgroundColor: 'hsl(20, 100%, 48%)'
    },
    {
        index: 9,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Flooding</h6>
                    <p>
                        <a className="external-link -climate" href="https://iopscience.iop.org/article/10.1088/1748-9326/aacc76/meta" target="_blank"><strong>Annual flood losses would reach $10.2 trillion</strong></a> if no further adaptation is undertaken.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Basile Morin on Wikimedia
                     Commons <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(cc-by-4.0)</a>
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/flooding.png'
        },
        showYearCounter: true,
        yearValue: 2046,
        degrees: 1.5,
        yearSubtitle: 'In less than 30 years',
        yearBackgroundColor: 'hsl(20, 100%, 48%)'
    },
    {
        index: 10,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Human Displacement and Conflict</h6>
                    <p>
                        An estimated 1.5 billion people or <a className="external-link -climate" href="https://www.pnas.org/content/117/21/11350" target="_blank"><strong>13% of the projected global population would be living in inhabitable climates</strong></a> and 
                        would have to migrate.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Julie Ricard on Unsplash
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/human-displacement-and-conflict-second.jpg'
        },
        showYearCounter: true,
        yearValue: 2046,
        degrees: 1.5,
        yearSubtitle: 'In less than 30 years',
        yearBackgroundColor: 'hsl(20, 100%, 48%)'
    },
    {
        index: 11,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Coral Reefs</h6>
                    <p>
                        Ocean warming, acidification and more intense storms would 
                        cause <a className="external-link -climate" href="https://climate.nasa.gov/news/2865/a-degree-of-concern-why-global-temperatures-matter/#:~:text=If%20warming%20reaches%202%20degrees,on%20humans%20and%20ecological%20systems" target="_blank"><strong>coral reefs to decline by 70 to 90 percent</strong></a>.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Julie Ricard on Unsplash
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/coral-reefs.jpg'
        },
        showYearCounter: true,
        yearValue: 2046,
        degrees: 1.5,
        yearSubtitle: 'In less than 30 years',
        yearBackgroundColor: 'hsl(20, 100%, 48%)'
    },
    {
        index: 12,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Extreme rainfall</h6>
                    <p>
                        Annual losses from flood damage and sea level rise would 
                        reach <a className="external-link -climate" href="https://interactive.carbonbrief.org/impacts-climate-change-one-point-five-degrees-two-degrees/?utm_source=web&utm_campaign=Redirect" target="_blank"><strong>$11.7 trillion</strong></a> if no further adaptation is undertaken.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Saikiran Kesari on Unsplash
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/extreme-rainfall.jpg'
        },
        showYearCounter: true,
        previousYearValue: 2046,
        yearValue: 2064,
        previousDegrees: 1.5,
        degrees: 2.0,
        yearSubtitle: 'In less than 50 years',
        yearBackgroundColor: '#DB1600'
    },
    {
        index: 13,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Heatwaves and Water Scarcity</h6>
                    <p>
                        More than a third of the world’s population would face the risk of 
                        a <a className="external-link -climate" href="https://interactive.carbonbrief.org/impacts-climate-change-one-point-five-degrees-two-degrees/?utm_source=web&utm_campaign=Redirect" target="_blank"><strong>heatwave every 5 years</strong></a>.
                    </p>
                    <p>
                        The deadly heat waves like what India and Pakistan endured in 2015 <a className="external-link -climate" href="https://climate.nasa.gov/news/2865/a-degree-of-concern-why-global-temperatures-matter/#:~:text=If%20warming%20reaches%202%20degrees,on%20humans%20and%20ecological%20systems." target="_blank">could occur annually</a>.
                    </p>
                    <p>
                        <a className="external-link -climate" href="https://interactive.carbonbrief.org/impacts-climate-change-one-point-five-degrees-two-degrees/?utm_source=web&utm_campaign=Redirect" target="_blank"><strong>Water scarcity would threaten 388 million more people</strong></a> around the world
                    </p>
                    <p className="photo-subtitle">
                        Photo by Jotpe on Wikimedia Commons <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(cc-by-4.0)</a>
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/heatwaves-and-water-scarcity.jpg'
        },
        showYearCounter: true,
        yearValue: 2064,
        degrees: 2.0,
        yearSubtitle: 'In less than 50 years',
        yearBackgroundColor: '#DB1600'
    },
    {
        index: 14,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Sea Ice and Permafrost</h6>
                    <p>
                        The Arctic Ocean would be <a className="external-link -climate" href="https://climate.nasa.gov/news/2865/a-degree-of-concern-why-global-temperatures-matter/#:~:text=If%20warming%20reaches%202%20degrees,on%20humans%20and%20ecological%20systems." target="_blank">sea ice-free one summer per decade</a>.
                    </p>
                    <p>
                        An estimated <a className="external-link -climate" href="https://www.nature.com/articles/s41467-020-16357-8 " target="_blank"><strong>40% of permafrost area would thaw, releasing its carbon and methane</strong></a> into the atmosphere.
                    </p>
                    <p>
                        <a className="external-link -climate" href="https://e360.yale.edu/features/how-melting-permafrost-is-beginning-to-transform-the-arctic" target="_blank">Permafrost stores twice as much carbon</a> as currently contained in the atmosphere.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Boris Radosavljevic on Flickr <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank">(cc-by-2.0)</a>
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/sea-ice-and-permafrost.jpg'
        },
        showYearCounter: true,
        yearValue: 2064,
        degrees: 2.0,
        yearSubtitle: 'In less than 50 years',
        yearBackgroundColor: '#DB1600'
    },
    {
        index: 15,
        textPanel: {
            text:
                <>
                    <h6 className="climate">Biodiversity</h6>
                    <p>
                        A projected <a className="external-link -climate" href="https://www.ipcc.ch/sr15/chapter/spm/" target="_blank"><strong>18% of insects, 16% of plants and 8% of vertebrates</strong></a> would 
                        lose over half of their geographic range.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Edson Maciel on Unsplash
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/biodiversity-second.jpg'
        },
        showYearCounter: true,
        yearValue: 2064,
        degrees: 2.0,
        yearSubtitle: 'In less than 50 years',
        yearBackgroundColor: '#DB1600'
    },
    {
        index: 16,
        textPanel: {
            text:
                <>
                    <h6 className="climate">HUMAN DISPLACEMENT AND CONFLICT</h6>
                    <p>
                        Climate has contributed to between 3% and 20% of armed conflicts over
                        the last century and will likely fuel many more conflicts in the future.
                </p>
                    <p>
                        Even in a scenario of 2 degrees Celsius of warming beyond preindustrial
                     levels —the stated goal of the Paris Climate Agreement— <strong>the influence
                      of climate on conflicts would more than double</strong>, rising to a 13% chance.
                </p>
                    <p className="photo-subtitle">
                        Photo by Ggia on Wikimedia Commons <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(cc-by-4.0)</a>
                    </p>
                </>
            ,
            imageHeader: '/static/images/scrolly-telling/climate/human-displacement-and-conflict-third.jpg'
        },
        showYearCounter: true,
        yearValue: 2064,
        degrees: 2.0,
        yearSubtitle: 'In less than 50 years',
        yearBackgroundColor: '#DB1600'
    },
    {
        index: 17,
        textPanel: {
            text:
                <>
                    <h6 className="climate">SEA ICE</h6>
                    <p>
                        The likelihood of ice free summer in the arctic would rise
                        to <strong>63% each year</strong>.
                    </p>
                    <p className="photo-subtitle">
                        Photo by Derek Oyen on Unsplash
                </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/sea-ice.jpg'
        },
        showYearCounter: true,
        previousYearValue: 2064,
        yearValue: 2089,
        previousDegrees: 2.0,
        degrees: 3.0,
        yearSubtitle: 'In less than 70 years',
        yearBackgroundColor: '#AD0000'
    },
    {
        index: 18,
        textPanel: {
            text:
                <>
                    <h6 className="climate">HUMAN DISPLACEMENT AND CONFLICT</h6>
                    <p>
                        <strong>2-3 billion people or 30% of the projected global population</strong> would
                        be living in inhabitable climates and would have to migrate.
                    </p>
                    <p className="photo-subtitle">
                        Photo by thekirbster on Flickr <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank">(cc-by-2.0)</a>
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/human-displacement-and-conflict-fourth.jpg'
        },
        showYearCounter: true,
        yearValue: 2089,
        degrees: 3.0,
        yearSubtitle: 'In less than 70 years',
        yearBackgroundColor: '#AD0000'
    },
    {
        index: 19,
        textPanel: {
            text:
                <>
                    <h6 className="climate">BIODIVERSITY</h6>
                    <p>
                        The suitable habitat for species would
                        <strong>decrease on average by half</strong>.
                    </p>
                    <p className="photo-subtitle">
                        Photo: Andrés Medina on Unsplash
                    </p>
                </>,
            imageHeader: '/static/images/scrolly-telling/climate/biodiversity-third.jpg'
        },
        showYearCounter: true,
        yearValue: 2089,
        degrees: 3.0,
        yearSubtitle: 'In less than 70 years',
        yearBackgroundColor: '#AD0000'
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
                        The Climate Clock shows a timer, <strong>counting down how long it will take to burn
                        through our “carbon budget”</strong> — the amount of CO2 that can still be released
                        into the atmosphere while limiting global warming to 1.5°C (or 34.7 °F) above pre-industrial
                         levels.  It projects a 2017 emissions rate into the future and calculates that holding
                          emissions to 420 Gt of CO2 emissions gives us a <strong>67% chance of staying within the threshold of 1.5°C</strong>.
                    </p>
                </>
        }
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
                          dramatically and irreversibly. <strong>Emissions have risen since 2017, which could mean we have
                          less time</strong> than the clock says. Temperature climbs after increases in atmospheric CO2,
                          so we would not feel the full impact of exceeding the carbon budget right away.
                           This clock follows the methodology from the Mercator Research Institute on Global Commons
                            and Climate Change (<a className="external-link -climate" href="https://www.mcc-berlin.net/en/index.html" target="_blank">MCC</a>) using data from the IPCC Special Report on Global Warming of 1.5°C .
                    </p>
                    {/* <p className={styles['text-card-source']}>
                        Source: This clock follows the methodology from the
                         <a href="https://www.mcc-berlin.net/en/index.html" target="_blank">Mercator Research Institute on Global Commons and Climate Change</a> (MCC)
                         using data from the IPCC Special Report on Global Warming of 1.5°C
                    </p> */}
                </>
        }
    }
]