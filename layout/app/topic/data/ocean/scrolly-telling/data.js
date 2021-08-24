// styles
import styles from "./ocean-scrolly-telling.module.scss";

export const PACIFIC_GARBAGE_PATCH_SVG = (
  <svg className={styles["pacific-garbage-patch"]} viewBox="0 0 600 300">
    <g fill="none" fillRule="evenodd" transform="translate(40 20)">
      <path
        fill="none"
        stroke="#F35600"
        strokeWidth="10"
        strokeDasharray="12 20"
        d="M 259 12.5 C 404.8658 12.5 523.5 58.3047 523.5 118 C 523.5 177.6953 404.8658 223.5 259 223.5 C 113.1342 223.5 -5.5 177.6953 -5.5 118 C -5.5 58.3047 113.1342 12.5 259 12.5 Z Z"
      />
      <g fill="none" fillRule="evenodd" stroke="#174F59" transform="translate(-27 -27)">
        <circle cx="27" cy="27" r="27" fill="#FFF" fillRule="nonzero" strokeWidth="3" />
        <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(12 12)">
          <path d="M19.029375,21.079125 L23.2245,12.529125 C23.8096521,11.3370808 23.7992316,9.93906401 23.196375,8.755875 C22.5935184,7.57268599 22.5830979,6.17466917 23.16825,4.982625 L24.46875,2.329875 L21.439125,0.842625 L20.1375,3.49425 C19.5525908,4.68642112 18.4406308,5.53372796 17.136,5.781375 C15.8312503,6.02862177 14.7189259,6.87547197 14.133375,8.067375 L9.225,18.0765" />
          <path d="M.84375 20.343375C2.70606477 18.6985109 5.10908165 17.7973796 7.59375 17.812125 11.8125 17.812125 19.40625 24.937875 26.15625 18.187875M.84375 25.405875C2.70606477 23.7610109 5.10908165 22.8598796 7.59375 22.874625 11.8125 22.874625 19.40625 30.000375 26.15625 23.250375" />
        </g>
        <animateMotion
          dur="25s"
          repeatCount="indefinite"
          path="M 259 12.5 C 404.8658 12.5 523.5 58.3047 523.5 118 C 523.5 177.6953 404.8658 223.5 259 223.5 C 113.1342 223.5 -5.5 177.6953 -5.5 118 C -5.5 58.3047 113.1342 12.5 259 12.5 Z Z"
        />
      </g>
    </g>
  </svg>
);
