import classnames from "classnames";

// components
import TippingPointChart from "./tipping-point-chart";

// styles
import styles from "./forests-scrolly-telling.module.scss";

// data
import { getTreesSVG } from "./data";

export const FORESTS_STEPS = [
  {
    index: 0,
    textPanel: {
      text: (
        <>
          <h6 className="forests">The Amazon Rainforest</h6>
          <p>
            The Amazon rainforest covers{" "}
            <a
              className="external-link -forests"
              href="https://www.nature.com/articles/d41586-020-00508-4"
              target="_blank"
              rel="noreferrer"
            >
              <span className="bold">597 Mha across nine countries</span>
            </a>{" "}
            and{" "}
            <a
              className="external-link -forests"
              href="https://data.apps.fao.org/aquamaps/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="bold">harbors 16,000 tree species</span>
            </a>
            .
          </p>
        </>
      ),
      imageHeader: "/static/images/scrolly-telling/forests/the-amazon-basin.jpg"
    },
    showYearCounter: false,
    stickyContainerElement: (
      <div
        className={classnames({
          [styles["-align-right"]]: true,
          [styles["south-america-map"]]: true
        })}
      >
        <img src="/static/images/scrolly-telling/forests/amazon_map.svg" />
      </div>
    ),
    visualSource: (
      <a
        href="https://github.com/Vizzuality/earth-dashboard-data/blob/main/processing/Forests.ipynb"
        target="_blank"
        rel="noreferrer"
      >
        Methodology for calculating boundaries
      </a>
    ),
    visualDataset: (
      <a href="https://data.apps.fao.org/aquamaps/" target="_blank" rel="noreferrer">
        FAO AQUAMAPS
      </a>
    )
  },
  {
    index: 1,
    textPanel: {
      text: (
        <p>
          The tiny trees here represent the estimated{" "}
          <a
            className="external-link -forests"
            href="https://developers.google.com/earth-engine/datasets/catalog/UMD_hansen_global_forest_change_2019_v1_7"
            target="_blank"
            rel="noreferrer"
          >
            <span className="bold">514 million hectares of tree cover present in the Amazon in the year 2000</span>
          </a>
          . That is an area the size of 12.5 Californias.
        </p>
      ),
      imageHeader: "/static/images/scrolly-telling/forests/tree-cover.jpg"
    },
    showYearCounter: true,
    yearValue: 2000,
    stickyContainerElement: (
      <div
        className={classnames({
          [styles["-align-right"]]: true,
          [styles["south-america-map-dissolved"]]: true,
          [styles["trees-container"]]: true
        })}
      >
        <img className={styles["map-image"]} src="/static/images/scrolly-telling/forests/amazon_map.svg" />
        {getTreesSVG("trees")}
      </div>
    ),
    visualSource: null,
    visualDataset: (
      <>
        <a href="https://bit.ly/3fij5rG" target="_blank" rel="noreferrer">
          Tree Cover
        </a>{" "}
        +
        <a href="https://bit.ly/36AdbzY" target="_blank" rel="noreferrer">
          Tree Cover Loss
        </a>
        . (from{" "}
        <a
          href="https://developers.google.com/earth-engine/datasets/catalog/UMD_hansen_global_forest_change_2019_v1_7"
          target="_blank"
          rel="noreferrer"
        >
          Hansen et al.
        </a>
        )
      </>
    )
  },
  {
    index: 2,
    textPanel: {
      text: (
        <p>
          Each tree represents <span className="bold">an area the size of Switzerland</span> (4.2 million hectares of
          tree cover).
        </p>
      )
    },
    showYearCounter: true,
    yearValue: 2000,
    yearSubtitle: "513.8 Mha of tree cover in the Amazon basin",
    stickyContainerElement: (
      <div
        className={classnames({
          [styles["-align-right"]]: true,
          [styles["south-america-map-dissolved"]]: true,
          [styles["trees-container"]]: true
        })}
      >
        {getTreesSVG("one-tree")}
      </div>
    ),
    visualSource: null,
    visualDataset: (
      <>
        <a href="https://bit.ly/3fij5rG" target="_blank" rel="noreferrer">
          Tree Cover
        </a>{" "}
        +
        <a href="https://bit.ly/36AdbzY" target="_blank" rel="noreferrer">
          Tree Cover Loss
        </a>
        . (from{" "}
        <a
          href="https://developers.google.com/earth-engine/datasets/catalog/UMD_hansen_global_forest_change_2019_v1_7"
          target="_blank"
          rel="noreferrer"
        >
          Hansen et al.
        </a>
        )
      </>
    )
  },
  {
    index: 3,
    textPanel: {
      text: (
        <p>
          Let’s fast forward to 2019. The saws represent{" "}
          <span className="bold">how much of that tree cover has been lost</span>. In these 19 years,{" "}
          <span className="bold">
            the Amazon has lost{" "}
            <a
              className="external-link -forests"
              href="https://developers.google.com/earth-engine/datasets/catalog/UMD_hansen_global_forest_change_2019_v1_7"
              target="_blank"
              rel="noreferrer"
            >
              an area equivalent to the size of 9 Switzerlands
            </a>
          </span>
          .
        </p>
      )
    },
    showYearCounter: true,
    previousYearValue: 2000,
    yearValuePrefix: "2001-",
    yearValue: 2019,
    yearSubtitle: "18.9 Mha of tree cover loss in the Amazon basin",
    stickyContainerElement: (
      <div
        className={classnames({
          [styles["-align-right"]]: true,
          [styles["south-america-map-dissolved"]]: true,
          [styles["trees-container"]]: true
        })}
      >
        {getTreesSVG("saws")}
      </div>
    ),
    visualSource: null,
    visualDataset: (
      <>
        <a href="https://bit.ly/3fij5rG" target="_blank" rel="noreferrer">
          Tree Cover
        </a>{" "}
        +
        <a href="https://bit.ly/36AdbzY" target="_blank" rel="noreferrer">
          Tree Cover Loss
        </a>
        . (from{" "}
        <a
          href="https://developers.google.com/earth-engine/datasets/catalog/UMD_hansen_global_forest_change_2019_v1_7"
          target="_blank"
          rel="noreferrer"
        >
          Hansen et al.
        </a>
        )
      </>
    )
  },
  {
    index: 4,
    textPanel: {
      text: (
        <>
          <h6 className="forests">Drivers of Tree Cover Loss</h6>
          <p>
            The main driver of tree cover loss in the Amazon is{" "}
            <a
              className="external-link -forests bold"
              href="https://science.sciencemag.org/content/361/6407/1108"
              target="_blank"
              rel="noreferrer"
            >
              commodity driven deforestation
            </a>
            , which includes activities like oil extraction, industrial mining, ranching, farming, and fires set to
            clear land.
          </p>
        </>
      ),
      imageHeader: "/static/images/scrolly-telling/forests/tree-cover-loss.jpg"
    },
    showYearCounter: true,
    yearValue: 2019,
    yearSubtitle: "Main drivers of tree cover loss in the Amazon basin",
    stickyContainerElement: (
      <div
        className={classnames({
          [styles["-align-right"]]: true,
          [styles["horizontal-bar-chart"]]: true
        })}
      >
        <img src="/static/images/scrolly-telling/forests/drivers_of_tree_cover_loss_chart.png" />
      </div>
    ),
    visualSource: (
      <>
        <a href="https://science.sciencemag.org/content/361/6407/1108" target="_blank" rel="noreferrer">
          Science
        </a>
        , Vizzuality data:{" "}
        <a
          href="https://nbviewer.jupyter.org/github/Vizzuality/earth-dashboard-data/blob/main/processing/Forests.ipynb"
          target="_blank"
          rel="noreferrer"
        >
          ipynb
        </a>
      </>
    ),
    visualDataset: (
      <a
        href="https://developers.google.com/earth-engine/datasets/catalog/UMD_hansen_global_forest_change_2019_v1_7"
        target="_blank"
        rel="noreferrer"
      >
        Hansen et al.
      </a>
    )
  },
  {
    index: 5,
    textPanel: {
      text: (
        <p>
          If current trends continue,{" "}
          <span className="bold">
            the remaining intact Amazon rainforest may become a{" "}
            <a
              className="external-link -forests"
              href="https://digitalcommons.unl.edu/cgi/viewcontent.cgi?article=1203&context=natlpark"
              target="_blank"
              rel="noreferrer"
            >
              net carbon emitter in 2035
            </a>
          </span>
          . That means it won’t be a carbon sink anymore, but will turn into a{" "}
          <span className="bold">carbon source</span>. This trend is dominated by the drier parts of the Amazon; wetter
          forests may remain sinks for much longer.
        </p>
      )
    },
    showYearCounter: false,
    stickyContainerElement: <TippingPointChart />,
    visualSource: (
      <>
        <a
          href="https://digitalcommons.unl.edu/cgi/viewcontent.cgi?article=1203&context=natlpark"
          target="_blank"
          rel="noreferrer"
        >
          Asynchronous carbon sink saturation in African and Amazonian tropical forests
        </a>
        , Hubau and Lewis, 2020.
      </>
    ),
    visualDataset: "Personal communication"
  }
];
