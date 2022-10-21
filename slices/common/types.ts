export type ShareType = "event" | "layer" | undefined;

export type CommonState = {
  hostname: string;
  isMobile: boolean;
  isShareOpen: boolean;
  isNewsSearchOpen: boolean;
  hasAppLoaded: boolean;
  share: ShareType;
};
