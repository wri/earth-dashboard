export type EventScaleData = {
  gradient: string;
  value?: number;
  minLabel: string;
  maxLabel: string;
};

export type MapControlsState = {
  projectionType: "orthographic" | "equirectangular";
  isSettingsOpen: boolean;
  isFetchLocationDisabled: boolean;
  shouldFetchLocation: boolean;
  shouldZoomIn: boolean;
  shouldZoomOut: boolean;
  isDatePickerOpen: boolean;
  isCookieOpen: boolean;
  isDatePickerDisabled: boolean;
  currentLocation?: [number, number];
  currentScale: string;
  currentScaleBy: number;
  hasReoriented: boolean;
  eventScaleData: EventScaleData | undefined;
};
