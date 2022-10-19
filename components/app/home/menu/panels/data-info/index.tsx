import { useEffect, useMemo, useRef, useState } from "react";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import MenuOption from "components/app/home/menu-option";
import Carousel from "components/ui/carousel";
import { ADVANCED_MENU, EARTH_HQ_VIEWED_CATEGORY } from "constants/tag-manager";
import { connect } from "react-redux";
import { Mode, setCurrentMode, pagePush, resetPageStack } from "slices/modes";
import { RootState } from "store/types";
import { fireEvent } from "utils/gtag";
import EventPrompt from "../../../event-prompt";
import CarouselCard from "./carousel-card";
import styles from "./data-info.module.scss";
import menuStyles from "../../menu.module.scss";
import classnames from "classnames";
import { PAGE_TYPE_ID } from "components/app/home/main-container/component";
import { removeSelectedHeadline } from "slices/headlines";
import Link from "next/link";
import ContentPanel from "components/app/home/content-panel";
import Image from "next/image";
import ExternalLinkIcon from "public/static/icons/external-link-v2.svg";
import ContentPanelSkeleton from "components/app/home/content-panel/content-panel-skeleton";
import { setAppLoaded } from "slices/common";

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
  hasAppLoaded: boolean;
  setAppLoaded: ActionCreatorWithoutPayload<string>;
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
  resetPageStack,
  hasAppLoaded
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

  const scrollToIndex = (index: number, behavior?: "auto" | "smooth") => {
    if (!carouselWidth || !carouselRef.current) return;

    const scrollLeft = index * (carouselWidth - SCROLL_NORMALIZE_VALUE);
    carouselRef.current.scrollTo({ left: scrollLeft, behavior });
  };

  const scrollFromMode = (behavior?: "auto" | "smooth") => {
    if (!carouselWidth || !carouselRef.current || !currentMode || !modes) return;

    const index = modes.findIndex(mode => mode.id === currentMode.id);

    if (!index) return;
    scrollToIndex(index, behavior);
  };

  useEffect(() => {
    removeSelectedHeadline();
    resetPageStack();
    if (currentMode && defaultMode && currentMode !== defaultMode && !hasAppLoaded)
      pagePush(PAGE_TYPE_ID.DATA_LAYER_PAGE);
  }, []);

  useEffect(() => {
    if (containerRef.current) setCarouselWidth(containerRef.current.offsetWidth);
    // eslint-disable-next-line
  }, [containerRef.current]);

  useEffect(() => {
    scrollFromMode();
  }, [carouselWidth, carouselRef.current]);

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
      style={isLoading ? { overflow: "hidden" } : {}}
    >
      <EventPrompt isMobile={isMobile} />

      {isMobile &&
        (isLoading ? (
          <div className={styles["skeleton-container"]}>
            <ContentPanelSkeleton className={styles["data-info-container__skeleton"]} />
          </div>
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
            finalItem={
              <Link href="https://earth.nullschool.net/">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={() => fireEvent(ADVANCED_MENU, null)}
                  style={{ minWidth: "100%" }}
                >
                  <ContentPanel className={menuStyles["c-home-menu-item--advanced-data-item"]} canFocus={false}>
                    <div className={menuStyles["c-home-menu-item__container"]}>
                      <h3 className={menuStyles["c-home-menu-item__title"]}>Advanced Data</h3>
                      <p className={menuStyles["c-home-menu-item__desc"]}>
                        Dive deeper into the full datasets available. Combine and overlay data to create unique maps and
                        visualizations.
                      </p>

                      <div className={menuStyles["c-home-menu-item__external-link"]}>
                        <Image width={16} height={16} alt="" role="presentation" src={ExternalLinkIcon} />
                        <span>Earth Nullschool</span>
                      </div>
                    </div>
                  </ContentPanel>
                </a>
              </Link>
            }
          />
        ))}

      {!isMobile &&
        (isLoading ? (
          <>
            <ContentPanelSkeleton className={styles["data-info-container__skeleton"]} />
            <ContentPanelSkeleton className={styles["data-info-container__skeleton"]} />
            <ContentPanelSkeleton className={styles["data-info-container__skeleton"]} />
          </>
        ) : (
          <>
            {dataLayers.map(dataLayer => (
              <MenuOption isSelected={currentMode?.id === dataLayer.id} key={dataLayer.id} {...dataLayer} />
            ))}
            <Link href="https://earth.nullschool.net/">
              <a rel="noopener noreferrer" target="_blank" onClick={() => fireEvent(ADVANCED_MENU, null)}>
                <ContentPanel className={menuStyles["c-home-menu-item--advanced-data-item"]} canFocus={true}>
                  <div className={menuStyles["c-home-menu-item__container"]}>
                    <h3 className={menuStyles["c-home-menu-item__title"]}>Advanced Data</h3>
                    <p className={menuStyles["c-home-menu-item__desc"]}>
                      Dive deeper into the full datasets available. Combine and overlay data to create unique maps and
                      visualizations.
                    </p>

                    <div className={menuStyles["c-home-menu-item__external-link"]}>
                      <Image width={16} height={16} alt="" role="presentation" src={ExternalLinkIcon} />
                      <span>Earth Nullschool</span>
                    </div>
                  </div>
                </ContentPanel>
              </a>
            </Link>
          </>
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
    defaultMode: state.modes.defaultMode,
    hasAppLoaded: state.common.hasAppLoaded
  }),
  { setCurrentMode, pagePush, resetPageStack, removeSelectedHeadline, setAppLoaded }
)(DataInfo);
