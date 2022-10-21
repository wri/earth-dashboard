import { Dispatch, forwardRef, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
import styles from "./menu.module.scss";
import InfoPanel from "./panels/info";
import DataInfoPanel from "./panels/data-info";
import DataLayerPanel from "./panels/data-layer";
import MenuLayout from "./layout";
import EventsListPanel from "./panels/events-list";
import MobileMenuContainer from "./menu-mobile-container";
import { PAGE_TYPE_ID, INFO_PAGE_HEADLINE, DATA_INFO_PAGE_HEADLINE } from "../main-container/component";
import CurrentEvent from "./panels/current-event";
import Icon from "components/ui/Icon";
import { EarthLayer } from "../main-container/types";
import {
  ActionCreatorWithOptionalPayload,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload
} from "@reduxjs/toolkit";
import { Headline } from "slices/headlines";
import { ShareType } from "slices/common";

type MenuProps = {
  isMobile: boolean;
  isClosing: boolean;
  onClose: () => void;
  mobileMenuHeight: number;
  setMobileMenuHeight: Dispatch<SetStateAction<number>>;
  pageTypeId: string;
  defaultMobileMenuHeight: number;
  headlinesLoading: boolean;
  layers: EarthLayer[];
  setCurrentHeadline: ActionCreatorWithPayload<Headline | undefined, string>;
  setCurrentHeadlineId: ActionCreatorWithOptionalPayload<number | undefined, string>;
  setDateOfDataShown: ActionCreatorWithPayload<string, string>;
  handleToggleLocation: () => void;
  isLocationDisabled: boolean;
  hasMenuOpen: boolean;
  pagePush: ActionCreatorWithPayload<string, string>;
  pagePop: ActionCreatorWithoutPayload<string>;
  share: ShareType;
  setShare: ActionCreatorWithOptionalPayload<ShareType, string>;
};

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      isMobile,
      onClose,
      isClosing,
      mobileMenuHeight,
      setMobileMenuHeight,
      pageTypeId,
      defaultMobileMenuHeight,
      headlinesLoading,
      handleToggleLocation,
      isLocationDisabled,
      hasMenuOpen,
      pagePush,
      pagePop,
      share,
      setShare
    },
    ref
  ) => {
    const router = useRouter();

    useEffect(() => {
      if (!share) return;

      if (share === "event") pagePush(PAGE_TYPE_ID.CURRENT_EVENT_PAGE);
      else if (share === "layer") pagePush(PAGE_TYPE_ID.DATA_LAYER_PAGE);

      setShare(undefined);

      // eslint-disable-next-line
    }, []);

    const getMenuContent = () => (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        {/* Resizable handle */}
        {isMobile && <div className={styles["c-home-menu-container__handle"]} />}

        {/* Single event view */}
        {pageTypeId == PAGE_TYPE_ID.CURRENT_EVENT_PAGE && (
          <MenuLayout ref={ref} title="Back" onBack={pagePop} onClose={onClose}>
            <CurrentEvent />
          </MenuLayout>
        )}
        {/* Main extreme events view */}
        {pageTypeId == PAGE_TYPE_ID.INFO_PAGE && router?.pathname === "/" && (
          <MenuLayout
            ref={ref}
            title={INFO_PAGE_HEADLINE}
            onClose={onClose}
            style={isMobile ? { paddingBottom: "56px" } : {}}
            icon={!isMobile && <Icon name="globe" size={22} type="decorative" />}
          >
            <InfoPanel />
          </MenuLayout>
        )}

        {/* Main data layers view */}
        {pageTypeId == PAGE_TYPE_ID.INFO_PAGE && router?.pathname === "/explore" && (
          <MenuLayout
            ref={ref}
            title={DATA_INFO_PAGE_HEADLINE}
            onClose={onClose}
            style={isMobile ? { paddingBottom: "56px" } : {}}
            icon={!isMobile && <Icon name="globe-search" size={22} type="decorative" />}
          >
            <DataInfoPanel />
          </MenuLayout>
        )}

        {/* All extreme events view */}
        {pageTypeId == PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE && (
          <MenuLayout ref={ref} title="Back" onBack={pagePop} onClose={onClose}>
            <EventsListPanel headlinesLoading={headlinesLoading} />
          </MenuLayout>
        )}

        {/* Data layer */}
        {pageTypeId == PAGE_TYPE_ID.DATA_LAYER_PAGE && (
          <MenuLayout ref={ref} title="Back" onBack={pagePop} onClose={onClose}>
            <DataLayerPanel onClickExtremeEvents={() => pagePush(PAGE_TYPE_ID.EXTREME_EVENTS_LIST_PAGE)} />
          </MenuLayout>
        )}
      </div>
    );

    if (isMobile)
      return (
        <MobileMenuContainer
          defaultPanelHeight={defaultMobileMenuHeight}
          panelHeight={mobileMenuHeight}
          setPanelHeight={setMobileMenuHeight}
          toggleMenu={onClose}
          pageTypeId={pageTypeId}
          handleToggleLocation={handleToggleLocation}
          isLocationDisabled={isLocationDisabled}
          hasMenuOpen={hasMenuOpen}
        >
          {getMenuContent()}
        </MobileMenuContainer>
      );
    return getMenuContent();
  }
);

Menu.displayName = "Menu";

export default Menu;
