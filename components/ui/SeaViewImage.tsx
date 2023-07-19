import { FC, useMemo } from "react";
import Image, { ImageProps } from "next/image";

export interface IProps extends ImageProps {
  src: string;
  resizeWidth?: number;
  // Ignore, to allow image to retain its ratio
  resizeHeight?: number;
}

/**
 * Component that first compresses and resizes the image using SeaView API
 * @see https://bitbucket.org/3sidedcube/seaview-api/src/master/
 */
const SeaViewImage: FC<IProps> = props => {
  const { src, resizeWidth, resizeHeight, ...rest } = props;

  const URL = useMemo(() => {
    if (!process.env.SEAVIEW_API_ROOT) {
      return src;
    }

    let paramsObj: Record<string, string> = { image: src };

    if (resizeWidth) {
      paramsObj = {
        ...paramsObj,
        width: resizeWidth.toString()
      };
    }

    if (resizeHeight) {
      paramsObj = {
        ...paramsObj,
        height: resizeHeight.toString()
      };
    }

    const searchParams = new URLSearchParams(paramsObj);

    return `${process.env.SEAVIEW_API_ROOT}?${searchParams.toString()}`;
  }, [src, resizeWidth, resizeHeight]);

  // eslint-disable-next-line
  return <Image src={URL} {...rest} />;
};

export default SeaViewImage;
