export type MapControlsState = {
  projectionType: string;
  isSettingsOpen: boolean;
  isFetchLocationDisabled: boolean;
  shouldFetchLocation: boolean;
  shouldZoomIn: boolean;
  shouldZoomOut: boolean;
  isDatePickerOpen: boolean;
  isDatePickerDisabled: boolean;
  currentLocation?: [number, number];
  currentScale: string;
  currentScaleBy: number;
};
