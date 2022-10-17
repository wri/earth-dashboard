import { useEffect, useMemo, useRef, useState } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import MenuOption from "components/app/home/menu-option";
import Carousel from "components/ui/carousel";
import { EARTH_HQ_VIEWED_CATEGORY } from "constants/tag-manager";
import { connect } from "react-redux";
import { Mode, setCurrentMode } from "slices/modes";
import { RootState } from "store/types";
import { fireEvent } from "utils/gtag";
import EventCardSkeleton from "../../../event-card/event-card-skeleton";
import EventPrompt from "../../../event-prompt";
import CarouselCard from "./carousel-card";
import styles from "./data-info.module.scss";
import menuStyles from "../../menu.module.scss";
import classnames from "classnames";

const SCROLL_NORMALIZE_VALUE = 37;

const mapHighlightToOption = (
  mode: Mode,
  onClickDataLayer: ActionCreatorWithPayload<Mode, string>,
  onViewDataLayerSummary: ActionCreatorWithPayload<Mode, string>
) => {
  const { id, attributes } = mode;
  return {
    id,
    ...attributes,
    buttonText: "Learn More",
    onClick: () => onClickDataLayer(mode),
    onClickCta: () => {
      fireEvent(EARTH_HQ_VIEWED_CATEGORY, attributes.title);
      onViewDataLayerSummary(mode);
    }
  };
};

type DataInfoProps = {
  isMobile: boolean;
  isLoading: boolean;
  modes: Mode[] | undefined;
  setCurrentMode: ActionCreatorWithPayload<Mode, string>;
  currentMode: Mode | undefined;
};

const DataInfo = ({ isMobile, isLoading, modes, setCurrentMode, currentMode }: DataInfoProps) => {
  const [carouselScroll, setCarouselScroll] = useState<number>(0);
  const [carouselWidth, setCarouselWidth] = useState<number>();
  const [isScrolling, setIsScrolling] = useState<NodeJS.Timeout>();

  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const dataLayers = useMemo(
    () => modes?.map(highlight => mapHighlightToOption(highlight, setCurrentMode, setCurrentMode)) || [],
    [modes, setCurrentMode]
  );

  const setModeToScroll = () => {
    if (!carouselWidth || !modes) return;

    let index = Math.round(carouselScroll / (carouselWidth - SCROLL_NORMALIZE_VALUE));
    if (index < modes.length) setCurrentMode(modes[index]);
  };

  useEffect(() => {
    if (containerRef.current) setCarouselWidth(containerRef.current.offsetWidth);
    // eslint-disable-next-line
  }, [containerRef.current]);

  useEffect(() => {
    window.clearTimeout(isScrolling);
    setIsScrolling(
      setTimeout(function () {
        setModeToScroll();
      }, 250)
    );
    // eslint-disable-next-line
  }, [carouselScroll, carouselWidth]);

  return (
    <div
      ref={containerRef}
      className={
        isMobile
          ? styles["data-info-container"]
          : classnames(menuStyles["c-home-menu__scroll-area"], menuStyles["c-home-menu__scroll-area--extra-top"])
      }
    >
      <EventPrompt isMobile={isMobile} />

      {isMobile &&
        (isLoading ? (
          <EventCardSkeleton className={styles["data-info-container__skeleton"]} />
        ) : (
          <Carousel
            items={
              modes?.map(mode => (
                <CarouselCard
                  isSelected={currentMode?.id === mode.id}
                  key={mode.id}
                  onClick={() => {}}
                  {...mode.attributes}
                />
              )) ?? []
            }
            style={{ height: "100%" }}
            ref={carouselRef}
            setScroll={setCarouselScroll}
          />
        ))}

      {!isMobile &&
        (isLoading ? (
          <EventCardSkeleton className={styles["data-info-container__skeleton"]} />
        ) : (
          dataLayers.map(dataLayer => (
            <MenuOption isSelected={currentMode?.id === dataLayer.id} key={dataLayer.id} {...dataLayer} />
          ))
        ))}
    </div>
  );
};

export default connect(
  (state: RootState) => ({
    isMobile: state.common.isMobile,
    isLoading: state.modes.modesLoading,
    modes: state.modes.allModes?.filter(mode => mode.attributes.visibility.data_highlights),
    currentMode: state.modes.currentMode
  }),
  { setCurrentMode }
)(DataInfo);
