import { EarthLayer } from "components/app/home/main-container/types";
import { createContext, FC, PropsWithChildren } from "react";
import useIframeBridge from "hooks/useIframeBridge";

interface IIframeBridgeContext extends Partial<ReturnType<typeof useIframeBridge>> {
  scaleData?: {
    min: string;
    max: string;
    unitSymbol: string;
    hasSmallLabels: boolean;
  };
  overlayLayer?: EarthLayer;
}

export const IframeBridgeContext = createContext<IIframeBridgeContext | undefined>(undefined);

const IframeBridgeProvider: FC<PropsWithChildren<IIframeBridgeContext>> = props => {
  const { children, ...rest } = props;

  return <IframeBridgeContext.Provider value={rest}>{children}</IframeBridgeContext.Provider>;
};

export default IframeBridgeProvider;
