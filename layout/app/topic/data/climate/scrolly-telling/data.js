import classnames from 'classnames';

// styles
import styles from './climate-scrolly-telling.module.scss';

export const getChartLine = (animate) =>
    <svg className={classnames({
            [styles['chart-line']]: true,
            [styles['-line']]: true,
            [styles['-animate']]: animate
        })}
        width="803" height="154" viewBox="0 0 803 154">
        <defs>
            <linearGradient id="chart-1---line-a" x1="0%" x2="145.435%" y1="51.563%" y2="45.006%">
                <stop offset="0%" stop-color="#009A67" />
                <stop offset="21.902%" stop-color="#139B5F" />
                <stop offset="68.804%" stop-color="#F3A600" />
                <stop offset="79.984%" stop-color="#F35600" />
                <stop offset="91.211%" stop-color="#F33900" />
                <stop offset="100%" stop-color="#BD0000" />
            </linearGradient>
        </defs>
        <polyline fill="none" stroke="url(#chart-1---line-a)" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" points="156 208.102 160.701 207.709 170.104 204.338 174.805 205.837 179.506 210.894 184.207 216.386 188.908 221.11 193.609 217.317 198.311 211.965 203.012 204.379 207.713 203.045 212.414 205.535 217.115 204.27 221.816 204.332 226.518 205.775 231.219 204.487 235.92 201.959 240.621 197.739 245.322 196.467 250.023 196.467 254.725 197.6 259.426 196.126 264.127 195.676 268.828 196.467 273.529 196.467 282.932 200.335 292.334 196.964 297.035 196.467 301.736 196.467 306.437 199.384 311.139 208.598 315.84 230.844 320.541 226.097 325.242 222.725 329.943 220.031 334.644 215.269 339.346 212.647 344.047 212.29 348.748 215.176 353.449 211.329 362.851 201.214 367.553 198.794 376.955 198.794 381.656 197.274 386.357 194.14 391.058 195.304 395.76 199.198 400.461 204.255 405.162 215.052 409.863 211.143 414.564 206.758 419.265 203.417 428.668 200.046 433.369 198.143 438.07 195.899 442.771 194.213 447.472 201.307 452.174 204.891 456.875 197.801 461.576 194.14 466.277 194.14 475.679 191.162 480.381 189.898 485.082 188.349 489.783 187.16 494.484 187.16 499.185 186.394 503.886 184.833 508.588 184.833 513.289 183.664 517.99 181.715 522.691 181.172 527.392 183.302 532.094 184.833 536.795 184.833 541.496 183.142 546.197 187.346 550.898 188.695 555.599 183.592 560.301 179.62 565.002 177.852 574.404 180.179 579.105 180.179 583.806 177.852 607.312 177.852 612.013 176.518 616.715 173.989 621.416 172.019 626.117 173.198 630.818 173.85 640.22 177.221 644.922 176.27 649.623 175.525 654.324 174.977 659.025 173.291 668.427 173.022 673.129 171.336 677.83 174.532 682.531 178.234 687.232 186.601 691.933 196.323 696.634 192.951 701.336 188.463 706.037 184.833 710.738 184.833 715.439 183.312 720.14 181.187 729.543 173.198 743.646 173.198 748.347 170.468 753.048 166.455 762.451 159.712 767.152 154.893 771.853 152.395 776.554 160.229 781.255 170.196 790.658 162.753 795.359 159.381 800.06 152.131 809.462 145.389 814.164 138.759 818.865 142.157 823.566 165.597 828.267 159.64 837.669 144.809 847.072 129.638 851.773 125.904 861.175 118.903 865.876 114.239 870.578 110.867 875.279 110.371 879.98 109.574 884.681 107.578 889.382 102.521 894.083 101.063 908.187 100.96 912.888 97.588 917.589 95.587 922.291 94.323 926.992 91.352 931.693 88.885 936.394 87.621 941.095 86.109 955.152 81" transform="translate(-154 -79)" />
    </svg>;

export const getChartLineFuture = (animate) =>
    <svg className={classnames({
            [styles['chart-line']]: true,
            [styles['-line-future']]: true,
            [styles['-animate']]: animate
        })}
        width="371" height="188" viewBox="0 0 371 188">
        <defs>
            <linearGradient id="chart-2---line-future-a" x1="0%" x2="99.138%" y1="61.148%" y2="37.467%">
                <stop offset="0%" stop-color="#F3A600" />
                <stop offset="18.676%" stop-color="#F35600" />
                <stop offset="66.639%" stop-color="#F33900" />
                <stop offset="100%" stop-color="#BD0000" />
            </linearGradient>
        </defs>
        <path fill="none" stroke="url(#chart-2---line-future-a)" stroke-dasharray="0 6" stroke-linecap="round" stroke-width="3" d="M934.087962,442.023353 L943.601027,438.634768 L948.302196,435.330226 L953.003365,432.593337 L957.704534,430.74847 L962.405703,427.818983 L967.106869,423.632554 L971.808038,420.1861 L976.509207,419.882001 L981.210376,421.676184 L985.911545,416.050354 L990.612714,416.719371 L995.313883,418.087817 L1000.01505,409.466611 L1004.71622,411.488869 L1009.41739,411.488869 L1014.11856,404.372954 L1018.81973,399.385731 L1023.52089,397.910852 L1028.22206,399.476961 L1032.92323,395.189166 L1042.32557,391.884624 L1047.02674,389.502516 L1051.72791,386.29934 L1061.13024,382.994799 L1065.83141,380.845832 L1070.53258,377.54129 L1084.63609,372.320926 L1089.33726,370.040184 L1094.03843,368.387913 L1098.7396,363.897385 L1103.44076,365.843618 L1108.14193,364.191348 L1117.54427,356.65983 L1122.24544,353.912803 L1126.94661,352.260532 L1131.64778,347.688912 L1136.34895,349.341183 L1141.05012,347.739594 L1145.75128,343.294682 L1150.45245,337.329274 L1155.15362,334.024732 L1159.85479,332.331914 L1164.55596,330.925457 L1169.25713,329.686254 L1173.9583,321.901321 L1178.65947,318.880604 L1192.76297,313.923792 L1197.46414,311.698802 L1202.16531,307.304572 L1206.86648,303.75675 L1216.26881,295.627172 L1220.96998,292.606456 L1230.37232,289.301914 L1235.07349,284.253872 L1239.77466,282.588929 L1244.47583,281.304112 L1253.87816,277.99957 L1258.57933,275.191723 L1263.2805,270.23491 L1267.98167,266.540109 L1272.68284,271.724995 L1277.38401,267.28515 L1282.08518,264.568533 L1286.78635,261.263991 L1291.48751,260.959892 L1296.18868,259.735895 L1300.88985,258.314232 L1305.59102,256.023353" transform="translate(-932 -256)" />
    </svg>;

export const CHART_AXES_1 =
    <svg className={styles['chart-axes']} width="1236px" height="543px" viewBox="0 0 1236 543">
        <title>5382839A-827C-42DE-B76D-AA54D7FEEE40</title>
        <g id="UI-kit" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Earth-Dashboard-UI-kit---Cimate" transform="translate(-102.000000, -19.000000)">
                <g id="chart" transform="translate(102.000000, 19.000000)">
                    <text id="+0.0-°C-Copy-2" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="6.664" y="418">+0.0 °C </tspan>
                    </text>
                    <text id="+1.0°C-Copy-2" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="12.096" y="317">+1.0°C </tspan>
                    </text>
                    <text id="-1.0-°C-Copy-2" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="11.102" y="519">-1.0 °C</tspan>
                    </text>
                    <text id="+2.0-°C-Copy-2" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="6.252" y="216">+2.0 °C</tspan>
                    </text>
                    <text id="+3.0-°C-Copy-2" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="7.168" y="115">+3.0 °C</tspan>
                    </text>
                    <text id="+4.0-°C-Copy-2" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="6.07" y="14">+4.0 °C  </tspan>
                    </text>
                    <text id="1850-copy-2" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="44" y="540">1850</tspan>
                    </text>
                    <text id="1900-copy-2" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="277" y="540">1900</tspan>
                    </text>
                    <text id="1950-copy-2" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="510" y="540">1950</tspan>
                    </text>
                    <text id="2000-copy-2" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="743" y="540">2000</tspan>
                    </text>
                    <text id="2050-copy-2" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="979" y="540">2050</tspan>
                    </text>
                    <text id="2100-copy-2" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="1214" y="540">2100</tspan>
                    </text>
                    <rect id="Rectangle-Copy-32" fill="#7C90A2" fill-rule="nonzero" x="53" y="515" width="1174" height="1"></rect>
                    <rect id="Rectangle-Copy-33" fill="#7C90A2" fill-rule="nonzero" x="53" y="414" width="1174" height="2"></rect>
                    <rect id="Rectangle-Copy-34" fill="#7C90A2" fill-rule="nonzero" x="53" y="313" width="1174" height="1"></rect>
                    <rect id="Rectangle-Copy-35" fill="#7C90A2" fill-rule="nonzero" x="53" y="212" width="1174" height="1"></rect>
                    <rect id="Rectangle-Copy-36" fill="#7C90A2" fill-rule="nonzero" x="53" y="111" width="1174" height="1"></rect>
                    <rect id="Rectangle-Copy-37" fill="#7C90A2" fill-rule="nonzero" x="53" y="9" width="1174" height="1"></rect>
                </g>
            </g>
        </g>
    </svg>;

export const CHART_AXES_2 =
    <svg className={styles['chart-axes']} width="1236px" height="543px" viewBox="0 0 1236 543">
        <title>76A9077F-D58A-47E2-9F97-5B74D4F38CCF</title>
        <g id="UI-kit" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Earth-Dashboard-UI-kit---Cimate" transform="translate(-102.000000, -712.000000)">
                <g id="chart" transform="translate(102.000000, 712.000000)">
                    <text id="+0.0-°C-Copy-4" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="6.664" y="418">+0.0 °C </tspan>
                    </text>
                    <text id="+1.0°C-Copy-4" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="12.096" y="317">+1.0°C </tspan>
                    </text>
                    <text id="-1.0-°C-Copy-4" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="11.102" y="519">-1.0 °C</tspan>
                    </text>
                    <text id="+2.0-°C-Copy-4" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="6.252" y="216">+2.0 °C</tspan>
                    </text>
                    <text id="+3.0-°C-Copy-4" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="7.168" y="115">+3.0 °C</tspan>
                    </text>
                    <text id="+4.0-°C-Copy-4" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="6.07" y="14">+4.0 °C  </tspan>
                    </text>
                    <text id="1850-copy-4" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="44" y="540">1850</tspan>
                    </text>
                    <text id="1900-copy-4" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="277" y="540">1900</tspan>
                    </text>
                    <text id="1950-copy-4" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="510" y="540">1950</tspan>
                    </text>
                    <text id="2000-copy-4" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="743" y="540">2000</tspan>
                    </text>
                    <text id="2050-copy-4" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="979" y="540">2050</tspan>
                    </text>
                    <text id="2100-copy-4" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="1214" y="540">2100</tspan>
                    </text>
                    <rect id="Rectangle-Copy-44" fill="#7C90A2" fill-rule="nonzero" x="53" y="515" width="1174" height="1"></rect>
                    <rect id="Rectangle-Copy-45" fill="#7C90A2" fill-rule="nonzero" x="53" y="414" width="1174" height="2"></rect>
                    <rect id="Rectangle-Copy-46" fill="#7C90A2" fill-rule="nonzero" x="53" y="313" width="1174" height="1"></rect>
                    <rect id="Rectangle-Copy-47" fill="#7C90A2" fill-rule="nonzero" x="53" y="212" width="1174" height="1"></rect>
                    <rect id="Rectangle-Copy-48" fill="#7C90A2" fill-rule="nonzero" x="53" y="111" width="1174" height="1"></rect>
                    <rect id="Rectangle-Copy-49" fill="#7C90A2" fill-rule="nonzero" x="53" y="9" width="1174" height="1"></rect>
                    <line x1="853.037822" y1="514.621817" x2="853.037822" y2="9.13948188" id="Path" stroke="#B7C2CC" fill-rule="nonzero"></line>
                    <text id="historical-data-copy-2" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="772" y="31">historical data</tspan>
                    </text>
                    <text id="projections-copy-2" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="866" y="31">projections</tspan>
                    </text>
                </g>
            </g>
        </g>
    </svg>;

export const CHART_AXES_3 =
    <svg className={styles['chart-axes']} width="1236px" height="543px" viewBox="0 0 1236 543">
        <title>9D1E8115-23C4-4D35-8D7E-8FBB8CD683DA</title>
        <g id="UI-kit" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Earth-Dashboard-UI-kit---Cimate" transform="translate(-102.000000, -1405.000000)">
                <g id="chart" transform="translate(102.000000, 1405.000000)">
                    <text id="2100-copy-3" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="1214" y="540">2100</tspan>
                    </text>
                    <text id="+0.0-°C-Copy-3" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="6.664" y="418">+0.0 °C </tspan>
                    </text>
                    <text id="+1.0°C-Copy-3" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="12.096" y="317">+1.0°C </tspan>
                    </text>
                    <text id="-1.0-°C-Copy-3" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="11.102" y="519">-1.0 °C</tspan>
                    </text>
                    <text id="+2.0-°C-Copy-3" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="6.252" y="216">+2.0 °C</tspan>
                    </text>
                    <text id="+3.0-°C-Copy-3" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="7.168" y="115">+3.0 °C</tspan>
                    </text>
                    <text id="+4.0-°C-Copy-3" font-family="Barlow Condensed" font-size="14" fill="#38444F">
                        <tspan x="6.07" y="14">+4.0 °C  </tspan>
                    </text>
                    <text id="2000" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="44" y="540">2000</tspan>
                    </text>
                    <text id="2020" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="277" y="540">2020</tspan>
                    </text>
                    <text id="2040" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="510" y="540">2040</tspan>
                    </text>
                    <text id="2060" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="743" y="540">2060</tspan>
                    </text>
                    <text id="2080" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="979" y="540">2080</tspan>
                    </text>
                    <rect id="Rectangle-Copy-38" fill="#7C90A2" fill-rule="nonzero" x="53" y="515" width="1174" height="1"></rect>
                    <rect id="Rectangle-Copy-39" fill="#7C90A2" fill-rule="nonzero" x="53" y="414" width="1174" height="2"></rect>
                    <rect id="Rectangle-Copy-40" fill="#7C90A2" fill-rule="nonzero" x="53" y="313" width="1174" height="1"></rect>
                    <rect id="Rectangle-Copy-41" fill="#7C90A2" fill-rule="nonzero" x="53" y="212" width="1174" height="1"></rect>
                    <rect id="Rectangle-Copy-42" fill="#7C90A2" fill-rule="nonzero" x="53" y="111" width="1174" height="1"></rect>
                    <rect id="Rectangle-Copy-43" fill="#7C90A2" fill-rule="nonzero" x="53" y="9" width="1174" height="1"></rect>
                    <line x1="289.037822" y1="514.621817" x2="289.037822" y2="9.13948188" id="Path" stroke="#B7C2CC" fill-rule="nonzero"></line>
                    <text id="historical-data-copy" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="208" y="31">historical data</tspan>
                    </text>
                    <text id="projections-copy" font-family="Barlow Condensed" font-size="14" fill="#7C90A2">
                        <tspan x="302" y="31">projections</tspan>
                    </text>
                </g>
            </g>
        </g>
    </svg>;