import { CommonState } from "slices/common";
import { DialogState } from "slices/dialog";
import { GlobalSettingsState } from "slices/globalSettings";
import { HeadlinesState } from "slices/headlines";
import { MapControlsState } from "slices/mapControls";
import { ModesState } from "slices/modes";

export type RootState = {
  common: CommonState;
  dialog: DialogState;
  globalSettings: GlobalSettingsState;
  headlines: HeadlinesState;
  mapControls: MapControlsState;
  modes: ModesState;
};
