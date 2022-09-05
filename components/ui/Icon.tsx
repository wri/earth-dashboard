import { CSSProperties, useEffect, useState } from "react";
import SVG from "react-inlinesvg";

export type IconNames =
  | "2d"
  | "3d"
  | "arrow-down-homepage"
  | "arrow-right"
  | "arrow-left"
  | "arrow-up-homepage"
  | "arrow up-right-homepage"
  | "back-chevron"
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "close"
  | "cog"
  | "cookie"
  | "copy-link"
  | "earth-hq"
  | "error-circle"
  | "external-link"
  | "facebook"
  | "instagram"
  | "layers"
  | "linkedin"
  | "live"
  | "location"
  | "more"
  | "search"
  | "share"
  | "toggle-arrow-down"
  | "twitter"
  | "youtube-play"
  | "zoom-in"
  | "zoom-out";

type AccessibilityProps =
  | { type: "meaningful"; accessibilityText: string }
  | {
      type: "decorative";
      accessibilityText?: never;
    };

type CommonProps = {
  name: IconNames;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export type IconProps = CommonProps & AccessibilityProps;

/**
 * Accessible icon component with dynamic import.
 * meaningful - Requires accessibilityText, use this for icons which needs context.
 * decorative - Will apply aria-hidden, use this if the icon is accompanied with some text or doesn't need more context.
 */
const Icon = ({ name, size, className, accessibilityText, type, style }: IconProps): JSX.Element => {
  const [path, setPath] = useState<string>();

  // Imports the SVG
  useEffect(() => {
    (async () => {
      setPath((await import(`public/static/icons/${name}.svg`)).default.src);
    })();
    // eslint-disable-next-line
  }, [name]);

  return (
    <SVG
      src={path ?? ""}
      aria-label={accessibilityText}
      aria-hidden={type === "decorative"}
      title={accessibilityText}
      className={className}
      {...(size
        ? {
            height: size,
            width: size
          }
        : {})}
      style={style}
    />
  );
};

export default Icon;
