import { forwardRef, useState, useEffect } from "react";
import classnames from "classnames";
import styles from "./menu.module.scss";
import PropTypes from "prop-types";
import DataIndexPanel from "./panels/data-options";
import DataLayerPanel from "./panels/data-layer";
import ResizablePanel from "components/app/home/dialog-panel/resizable-panel";
import { fireEvent } from "utils/gtag";
import { MENU_TAB_CHANGE_EVENT_NAME } from "constants/tag-manager";
import IconButton from "components/ui/icon-button";

const INFO_PAGE_HEADLINE = "I'd like to explore";

const Menu = forwardRef(
  (
    {
      isMobile,
      onClose,
      isClosing,
      modes,
      currentMode,
      setCurrentMode,
      animationValue,
      animationEnabled,
      setAnimationValue,
      datasetValue,
      setDatasetValue,
      monitorValue,
      setMonitorValue,
      heightValue,
      setHeightValue,
      earthServer,
      resetValues,
      layers,
      setDialogHeight,
      dialogHeight,
      setHeadlines,
      setCurrentHeadline,
      setCurrentHeadlineId,
      setDateOfDataShown,
      ...rest
    },
    ref
  ) => {
    const [isInfoPage, setIsInfoPage] = useState(!currentMode);
    const handleResize = (e, direction, div) => setDialogHeight({ height: div.offsetHeight });

    // Handle the headline info panel back button click
    const onBack = () => {
      setCurrentMode(undefined);
      setHeadlines([]);
      setIsInfoPage(true);
    };

    const setActiveDataLayer = selectedMode => {
      setIsInfoPage(false);
      setCurrentMode(selectedMode);
    };

    useEffect(() => {
      fireEvent(MENU_TAB_CHANGE_EVENT_NAME, INFO_PAGE_HEADLINE);
    }, [setCurrentHeadline]);

    const title = isInfoPage ? INFO_PAGE_HEADLINE : currentMode.attributes.title;

    return (
      <div
        className={classnames(styles["c-home-menu-container"], isClosing && styles["c-home-menu-container--closing"])}
      >
        <ResizablePanel isMobile={isMobile} height={dialogHeight} onResize={handleResize}>
          <div
            className={classnames(
              styles["c-home-menu"],
              isClosing && styles["c-home-menu--closing"],
              isInfoPage && styles["c-home-menu--is-info-page"]
            )}
            {...rest}
          >
            <div className={classnames(styles["c-home-menu__header"])}>
              <div className={classnames(styles["c-home-menu__header-content"])}>
                {!isInfoPage && (
                  <IconButton
                    className={styles["c-home-menu__back-button"]}
                    name="back"
                    medium
                    onClick={onBack}
                    aria-label="Back"
                  />
                )}
                <h2 className={styles["c-home-menu__header-text"]}>{title}</h2>
                {onClose && <IconButton name="close" size={12} medium onClick={onClose} aria-label="Close" />}
              </div>
            </div>
            <div className={classnames(styles["c-home-menu__content"], "u-padding-none")}>
              {isInfoPage ? (
                <DataIndexPanel onClickDataLayer={setActiveDataLayer} />
              ) : (
                <DataLayerPanel onClickDataLayer={setActiveDataLayer} />
              )}
            </div>
          </div>
        </ResizablePanel>
      </div>
    );
  }
);

Menu.displayName = "Menu";

Menu.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  isClosing: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  layers: PropTypes.array.isRequired,
  animationEnabled: PropTypes.bool.isRequired,
  setCurrentHeadline: PropTypes.func.isRequired,
  setCurrentHeadlineId: PropTypes.func.isRequired,
  setDateOfDataShown: PropTypes.func.isRequired
};

export default Menu;
