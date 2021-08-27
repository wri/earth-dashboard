import classnames from "classnames";

// constants
import {
  FILL_UP_ANIMATION,
  EMPTY_HALF_OUT_ANIMATION,
  BASELINE_WATER_STRESS_ANIMATION,
  WATER_STRESS_RISK_ANIMATION,
  WATER_STRESS_RISK_FINAL
} from "./water-drop/constants";

// styles
import styles from "./freshwater-scrolly-telling.module.scss";

export const HIGHLIGHT_ORANGE_COLOR = "#D85D44";

export const FRESHWATER_STEPS = [
  {
    index: 0,
    textPanel: {
      text: (
        <p>
          <span className="bold">Every region in the world has a yearly renewable water budget</span>, available to
          people, plants and animals living on it. It is represented by this big water droplet.
        </p>
      )
    },
    visualSource: (
      <a href="https://www.vizzuality.com/" target="_blank" rel="noreferrer">
        Vizzuality
      </a>
    )
  },
  {
    index: 1,
    textPanel: {
      text: (
        <>
          <h6 className="freshwater">FRESHWATER SUPPLIES</h6>
          <p>
            <span className="bold">On the supply side</span>, that water comes in the form of rainfall, rivers, lakes
            and other sources. That’s the amount of water that the region can naturally replenish every year.
          </p>
          <p className={styles["photo-subtitle"]}>
            Photo by Kevin Dooley on Flickr{" "}
            <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer">
              (cc-by-2.0)
            </a>
          </p>
        </>
      ),
      imageHeader: "/static/images/scrolly-telling/freshwater/freshwater-supplies.jpg"
    },
    dropAnimation: FILL_UP_ANIMATION,
    visualSource: (
      <a href="https://www.vizzuality.com/" target="_blank" rel="noreferrer">
        Vizzuality
      </a>
    )
  },
  {
    index: 2,
    textPanel: {
      text: (
        <>
          <h6 className="freshwater">FRESHWATER WITHDRAWALS</h6>
          <p>
            From that budget, <span className="bold">people withdraw water</span> to use it in their homes, to run
            factories, to irrigate fields and for the livestock they raise.
          </p>
          <p className={styles["photo-subtitle"]}>
            Photo by Ken Figlioli on Flickr{" "}
            <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer">
              (cc-by-2.0)
            </a>
          </p>
        </>
      ),
      imageHeader: "/static/images/scrolly-telling/freshwater/freshwater-withdrawals.jpg"
    },
    dropAnimation: EMPTY_HALF_OUT_ANIMATION,
    visualSource: (
      <a href="https://www.vizzuality.com/" target="_blank" rel="noreferrer">
        Vizzuality
      </a>
    )
  },
  {
    index: 3,
    textPanel: {
      text: (
        <p>
          Ideally, no region should withdraw more water than it can naturally replenish.{" "}
          <span className="bold">Baseline water stress</span> measures the ratio of total water withdrawals to available
          renewable surface and groundwater supplies. It is expressed as a percentage.{" "}
          <a
            className="external-link -freshwater bold"
            href="https://resourcewatch.org/data/explore/wat050-Aqueduct-Baseline-Water-Stress"
            target="_blank"
            rel="noreferrer"
          >
            These risk scores range from low water stress (&lt;10%) to extremely high water stress (&gt;80%)
          </a>
          .
        </p>
      )
    },
    dropAnimation: BASELINE_WATER_STRESS_ANIMATION,
    visualSource: (
      <a href="https://www.vizzuality.com/" target="_blank" rel="noreferrer">
        Vizzuality
      </a>
    )
  },
  {
    index: 4,
    textPanel: {
      text: (
        <>
          <h6 className="freshwater">WATER STRESS RISK</h6>
          <p>If a region overspends its budget, we say it has a high water stress risk. Among the consequences are:</p>
          <ul>
            <li>
              It has to <span className="bold">import water</span> from other regions
            </li>
            <li>
              It has to <span className="bold">use non-renewable groundwater sources</span>, which run the risk of
              depletion
            </li>
            <li>
              It has to <span className="bold">build reservoir infrastructure</span> with high ecological impact
            </li>
            <li>
              It will be <span className="bold">less resilient to natural hazards</span> such as droughts,
              desertification, etc.
            </li>
          </ul>
          <p className={styles["photo-subtitle"]}>Photo by John Gibbons on Unsplash</p>
        </>
      ),
      imageHeader: "/static/images/scrolly-telling/freshwater/water-stress-risks.jpg"
    },
    dropAnimation: WATER_STRESS_RISK_ANIMATION,
    visualSource: (
      <a href="https://www.vizzuality.com/" target="_blank" rel="noreferrer">
        Vizzuality
      </a>
    )
  },
  {
    index: 5,
    textPanel: {
      text: (
        <p>
          Let’s explore some regions of the work with <span className="bold">extremely high water stress risk</span>{" "}
          (&gt;80%)
        </p>
      )
    },
    dropAnimation: WATER_STRESS_RISK_FINAL,
    visualSource: (
      <a href="https://www.vizzuality.com/" target="_blank" rel="noreferrer">
        Vizzuality
      </a>
    )
  }
];

export const FRESHWATER_STEPS_WORLDMAP = [
  {
    index: 0,
    textPanel: {
      text: (
        <>
          <h6 className="freshwater">Middle East and North Africa (MENA)</h6>
          <p>
            <span className="bold">
              This region is home to{" "}
              <a
                className="external-link -freshwater"
                href="https://www.wri.org/blog/2019/08/17-countries-home-one-quarter-world-population-face-extremely-high-water-stress"
                target="_blank"
                rel="noreferrer"
              >
                12 of the world’s 17 most water stressed countries
              </a>
            </span>
            . Climate change will make water still scarcer by 2050 causing economic losses ranging from{" "}
            <a
              className="bold external-link -freshwater"
              href="https://www.wri.org/blog/2019/08/17-countries-home-one-quarter-world-population-face-extremely-high-water-stress"
              target="_blank"
              rel="noreferrer"
            >
              six to 14 percent of GDP
            </a>
            .
          </p>
        </>
      )
    },
    visualSource: (
      <a
        href="https://www.wri.org/blog/2019/08/17-countries-home-one-quarter-world-population-face-extremely-high-water-stress"
        target="_blank"
        rel="noreferrer"
      >
        WRI Aqueduct
      </a>
    ),
    visualDataset: (
      <a href="https://bit.ly/2Pd2Dyy" target="_blank" rel="noreferrer">
        Aqueduct Baseline Water Stress
      </a>
    )
  },
  {
    index: 1,
    textPanel: {
      text: (
        <>
          <h6 className="freshwater">Chennai, India</h6>
          <p>
            <a
              className="external-link -freshwater bold"
              href="https://www.wri.org/blog/2019/06/how-does-flood-prone-city-run-out-water-inside-chennai-day-zero-crisis"
              target="_blank"
              rel="noreferrer"
            >
              Reservoirs in Chennai nearly ran dry
            </a>
            , forcing the city’s 10 million residents to buy water or draw it from wells, further draining aquifers.
            India’s water sources are being depleted and researchers say{" "}
            <span className="bold">the nation faces the worst water crisis in its history</span>.
          </p>
        </>
      )
    },
    visualSource: (
      <a
        href="https://www.wri.org/blog/2019/08/17-countries-home-one-quarter-world-population-face-extremely-high-water-stress"
        target="_blank"
        rel="noreferrer"
      >
        WRI Aqueduct
      </a>
    ),
    visualDataset: (
      <a href="https://bit.ly/2Pd2Dyy" target="_blank" rel="noreferrer">
        Aqueduct Baseline Water Stress
      </a>
    )
  },
  {
    index: 2,
    textPanel: {
      text: (
        <>
          <h6 className="freshwater">Cape Town, South Africa</h6>
          <p>
            <span className="bold">Three years of drought</span> left Cape Town facing the spectre of “Day Zero,” the
            day South Africa’s second largest city government would need to{" "}
            <a
              className="external-link -freshwater bold"
              href="https://www.nytimes.com/2018/01/30/world/africa/cape-town-day-zero.html"
              target="_blank"
              rel="noreferrer"
            >
              shut off water taps
            </a>{" "}
            for most homes and businesses. Aggressive conservation measures and rain spared the city.
          </p>
        </>
      )
    },
    visualSource: (
      <a
        href="https://www.wri.org/blog/2019/08/17-countries-home-one-quarter-world-population-face-extremely-high-water-stress"
        target="_blank"
        rel="noreferrer"
      >
        WRI Aqueduct
      </a>
    ),
    visualDataset: (
      <a href="https://bit.ly/2Pd2Dyy" target="_blank" rel="noreferrer">
        Aqueduct Baseline Water Stress
      </a>
    )
  },
  {
    index: 3,
    textPanel: {
      text: (
        <>
          <h6 className="freshwater">Rome, Italy</h6>
          <p>
            Rome endured months with hardly any rain -{" "}
            <a
              className="bold external-link -freshwater"
              href="https://www.wri.org/blog/2019/08/17-countries-home-one-quarter-world-population-face-extremely-high-water-stress"
              target="_blank"
              rel="noreferrer"
            >
              a drop of 70% from previous years
            </a>
            . The city resorted to cutting water pressure during the night on peak days. Some in tall buildings lost
            service. The Vatican turned off its 100 fountains.
          </p>
        </>
      )
    },
    visualSource: (
      <a
        href="https://www.wri.org/blog/2019/08/17-countries-home-one-quarter-world-population-face-extremely-high-water-stress"
        target="_blank"
        rel="noreferrer"
      >
        WRI Aqueduct
      </a>
    ),
    visualDataset: (
      <a href="https://bit.ly/2Pd2Dyy" target="_blank" rel="noreferrer">
        Aqueduct Baseline Water Stress
      </a>
    )
  }
];

export const FRESHWATER_WATER_DROP_LOCATIONS = [
  {
    index: 0,
    mobile: {
      top: "34px",
      left: "197px"
    },
    desktop: {
      top: "94px",
      left: "431px"
    }
  },
  {
    index: 1,
    mobile: {
      top: "50px",
      left: "245px"
    },
    desktop: {
      top: "134px",
      left: "532px"
    }
  },
  {
    index: 2,
    mobile: {
      top: "103px",
      left: "173px"
    },
    desktop: {
      top: "239px",
      left: "401px"
    }
  },
  {
    index: 3,
    mobile: {
      top: "24px",
      left: "175px"
    },
    desktop: {
      top: "66px",
      left: "385px"
    }
  }
];
