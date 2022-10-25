import classnames from "classnames";
import DialogPanel from "components/app/home/dialog-panel";
import IconButton from "components/ui/icon-button";
import styles from "./settings-menu.module.scss";
import useDialogPanel from "hooks/useDialogPanel";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Preferences from "./preferences";
import Icon from "components/ui/Icon";
import Basemaps from "./basemaps";
import DatePicker from "components/date-picker";
import { format } from "date-fns";
import Footer from "./footer";
import CookiePreferences from "./cookie-preferences";
import { useEffect, useState } from "react";
import { fireEvent } from "utils/gtag";
import { PAGE_VIEW } from "constants/tag-manager";

type SettingsMenuProps = {
  isOpen: boolean;
  isDatePickerOpen: boolean;
  isCookieOpen: boolean;
  isMobile: boolean;
  currentDate?: Date;
  setSettingsClose: ActionCreatorWithoutPayload<string>;
  setDateOfDataShown: ActionCreatorWithPayload<string, string>;
  setIsDatePickerOpen: ActionCreatorWithPayload<boolean, string>;
  setIsCookieOpen: ActionCreatorWithPayload<boolean, string>;
};

/** Overlay settings menu for both desktop and mobile. */
const SettingsMenu = ({
  isOpen,
  isDatePickerOpen,
  isCookieOpen,
  currentDate,
  isMobile,
  setDateOfDataShown,
  setSettingsClose,
  setIsDatePickerOpen,
  setIsCookieOpen
}: SettingsMenuProps) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false);

  const { shouldAnimate, handleClose } = useDialogPanel(isOpen, () => {
    setSettingsClose();
    setIsDatePickerOpen(false);
    setIsCookieOpen(false);
  });

  useEffect(() => {
    if (isCookieOpen) fireEvent(PAGE_VIEW, "cookies");

    const onboardingEl = document.getElementById("onboarding-modal");

    setIsOnboarding(!!onboardingEl);
  }, [isCookieOpen]);

  /** Sets the current date data. */
  const handleChangeDate = (date: Date) => {
    setDateOfDataShown(date.toString());
    setIsDatePickerOpen(false);
  };

  const handleBack = () => {
    setIsDatePickerOpen(false);
    setIsCookieOpen(false);
  };

  const onRef = (e: HTMLDivElement) => {
    if (e) {
      e.scrollTo(0, 0);
    }
  };

  return isOpen ? (
    <DialogPanel onClose={handleClose} isMobile={isMobile} shouldAnimate={shouldAnimate}>
      <div className={styles["c-settings-menu-modal"]} aria-labelledby="settingsModalTitle" role="document">
        {/* Settings */}
        <div className={classnames(styles["c-settings-menu-modal__header"], "u-text-center")}>
          {/* Header */}
          <div>
            {!isOnboarding ? (
              isDatePickerOpen || isCookieOpen ? (
                <IconButton
                  name="arrow-left-v2"
                  onClick={handleBack}
                  small
                  className={styles["c-settings-menu-modal__back"]}
                />
              ) : (
                <Icon name={"more"} size={30} type="decorative" className={styles["icon"]} />
              )
            ) : null}
            <h2
              id="settingsModalTitle"
              className={classnames(
                styles["title"],
                { [styles["no-left-margin"]]: isOnboarding },
                "u-margin-bottom-none"
              )}
            >
              {isCookieOpen ? "Cookies" : isDatePickerOpen ? "Change Date" : "More"}
            </h2>
          </div>

          {/* Close button */}
          <IconButton
            name="close"
            size={12}
            aria-label="Close Settings"
            className={styles["c-settings-menu-modal__close"]}
            onClick={handleClose}
            small
          />
        </div>

        {/* Content */}
        <div className={styles["c-settings-menu-modal__body"]}>
          <div className={styles["scroll"]} ref={onRef}>
            {/* Dynamic views */}
            {isCookieOpen ? (
              <div className={styles["main"]}>
                <div className={styles["c-settings-menu-modal__cookie"]}>
                  <h3 className={styles["c-settings-menu-modal__cookie__text"]}>Cookies</h3>
                  <p>
                    We use cookies along with Analytical tools (Google analytics, Crazy Egg and Hotjar) to measure how
                    you use the website so we can improve it based on user needs. Google Analytics sets cookies that
                    store anonymised information about how you got to the site, the pages you visit and how long you
                    spend on each page and what you click on while you are visiting the site.
                  </p>
                  <p>You can change your cookie preferences by clicking the toggle below.</p>
                  <p>
                    Alternatively, most web browsers allow some control of most cookies through the browser settings. To
                    find out more about cookies, including how to see what cookies have been set, visit
                    <a href="http://www.aboutcookies.org/" target="_blank" rel="noreferrer noopenner">
                      {" "}
                      www.aboutcookies.org
                    </a>{" "}
                    or
                    <a href="http://www.allaboutcookies.org/" target="_blank" rel="noreferrer noopenner">
                      {" "}
                      www.allaboutcookies.org
                    </a>
                    .
                  </p>
                  <p>Find out how to manage cookies on popular browsers:</p>
                  <ul>
                    <li>
                      <a
                        href="https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&amp;hl=en"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Google Chrome
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Microsoft Edge
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Mozilla Firefox
                      </a>
                    </li>
                    <li>
                      <a href="https://www.opera.com/help/tutorials/security/privacy/" target="_blank" rel="noreferrer">
                        Opera
                      </a>
                    </li>
                    <li>
                      <a href="https://support.apple.com/en-gb/safari" target="_blank" rel="noreferrer">
                        Apple Safari
                      </a>
                    </li>
                  </ul>
                  <p>To find information relating to other browsers, visit the browser developer&apos;s website.</p>
                  <p>
                    To opt out of being tracked by Google Analytics across all websites, visit
                    <a href="http://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer noopenner">
                      {" "}
                      http://tools.google.com/dlpage/gaoptout
                    </a>
                    .
                  </p>
                </div>
                <CookiePreferences />
              </div>
            ) : isDatePickerOpen ? (
              // Change date
              <div className={styles["main"]}>
                <p className={styles["c-settings-menu-modal__date-text"]}>
                  Showing data for: {format(currentDate ?? new Date(), "yyyy-MM-dd")} Local
                </p>
                <DatePicker
                  // @ts-expect-error
                  initialDate={currentDate ?? new Date()}
                  onSubmit={handleChangeDate}
                  hasLiveDataButton
                  className={styles["c-settings-menu-modal__date-picker"]}
                />
              </div>
            ) : (
              // Other options
              <>
                <Preferences />
                <Basemaps />
                <Footer />
              </>
            )}
          </div>
        </div>
      </div>
    </DialogPanel>
  ) : null;
};

export default SettingsMenu;
