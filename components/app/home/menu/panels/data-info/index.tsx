import { useEffect, useMemo, useRef, useState } from "react";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import MenuOption from "components/app/home/menu-option";
import Carousel from "components/ui/carousel";
import { EARTH_HQ_VIEWED_CATEGORY } from "constants/tag-manager";
import { connect } from "react-redux";
import { Mode, setCurrentMode, pagePush, resetPageStack } from "slices/modes";
import { RootState } from "store/types";
import { fireEvent } from "utils/gtag";
import EventCardSkeleton from "../../../event-card/event-card-skeleton";
import EventPrompt from "../../../event-prompt";
import CarouselCard from "./carousel-card";
import styles from "./data-info.module.scss";
import menuStyles from "../../menu.module.scss";
import classnames from "classnames";
import { PAGE_TYPE_ID } from "components/app/home/main-container/component";
import { removeSelectedHeadline } from "slices/headlines";

const SCROLL_NORMALIZE_VALUE = 37;

const mapHighlightToOption = (
  mode: Mode,
  onClickDataLayer: ActionCreatorWithPayload<Mode, string>,
  onClickCta: () => void
) => {
  const { id, attributes } = mode;
  return {
    id,
    ...attributes,
    buttonText: "Learn More",
    onClick: () => onClickDataLayer(mode),
    onClickCta
  };
};

type DataInfoProps = {
  isMobile: boolean;
  isLoading: boolean;
  modes: Mode[] | undefined;
  setCurrentMode: ActionCreatorWithPayload<Mode, string>;
  currentMode: Mode | undefined;
  pagePush: ActionCreatorWithPayload<string, string>;
  removeSelectedHeadline: ActionCreatorWithoutPayload<string>;
  defaultMode: Mode | undefined;
  resetPageStack: ActionCreatorWithoutPayload<string>;
};

const DataInfo = ({
  isMobile,
  isLoading,
  modes,
  setCurrentMode,
  currentMode,
  pagePush,
  removeSelectedHeadline,
  defaultMode,
  resetPageStack
}: DataInfoProps) => {
  const [carouselScroll, setCarouselScroll] = useState<number>(0);
  const [carouselWidth, setCarouselWidth] = useState<number>();
  const [isScrolling, setIsScrolling] = useState<NodeJS.Timeout>();

  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleModeClicked = (mode: Mode) => {
    fireEvent(EARTH_HQ_VIEWED_CATEGORY, mode.attributes.title);
    setCurrentMode(mode);
    pagePush(PAGE_TYPE_ID.DATA_LAYER_PAGE);
  };

  const dataLayers = useMemo(
    () => modes?.map(mode => mapHighlightToOption(mode, setCurrentMode, () => handleModeClicked(mode))) || [],
    [modes, setCurrentMode, pagePush]
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
    if (isMobile) {
      window.clearTimeout(isScrolling);
      setIsScrolling(
        setTimeout(function () {
          setModeToScroll();
        }, 250)
      );
    }
    // eslint-disable-next-line
  }, [carouselScroll, carouselWidth]);

  useEffect(() => {
    removeSelectedHeadline();
    resetPageStack();
  }, []);

  useEffect(() => {
    if ((!currentMode || currentMode === defaultMode) && modes) setCurrentMode(modes[0]);
  }, [modes, currentMode, defaultMode]);

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
                  onClick={() => handleModeClicked(mode)}
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
    modes: state.modes.allModes
      ?.filter(mode => mode.attributes.visibility.data_highlights && mode.attributes.extreme_event_count !== 0)
      .sort((a, b) => (a.attributes.extreme_event_count > b.attributes.extreme_event_count ? -1 : 1)),
    currentMode: state.modes.currentMode,
    defaultMode: state.modes.defaultMode
  }),
  { setCurrentMode, pagePush, resetPageStack, removeSelectedHeadline }
)(DataInfo);
