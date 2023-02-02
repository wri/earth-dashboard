import screenfull from "screenfull";
import YouTube from "react-youtube";
import Icon from "components/ui/Icon";
import styles from "./tipping-point.module.scss";
import { useRef } from "react";
import { useEffectOnce } from "react-use";

const YT_VIDEO_ID = "IPduu1D84PI";

/** A banner to open the tipping point video. */
const TippingPoint = () => {
  const ref = useRef<YouTube>(null);

  // Detect if fullscreen changes
  useEffectOnce(() => {
    if (!screenfull.isEnabled) return;

    screenfull.on("change", () => {
      if (!screenfull.isFullscreen) ref.current?.getInternalPlayer().pauseVideo();
    });

    (async () => {
      const iframe: HTMLIFrameElement = await ref.current?.getInternalPlayer().getIframe();

      if (!iframe) return;

      iframe.setAttribute("webkitallowfullscreen", "1");
      iframe.setAttribute("mozallowfullscreen", "1");
    })();
  });

  /** Open the video and autoplay. */
  const handleOpenVideo = async () => {
    if (!ref.current) return;

    const player = ref.current.getInternalPlayer();
    player.seekTo(0);
    player.playVideo();

    const iframe = await player.getIframe();

    if (!iframe || !screenfull.isEnabled) {
      return window.open(`https://www.youtube.com/watch?v=${YT_VIDEO_ID}`, "_blank");
    }

    screenfull.request(iframe);
  };

  return (
    <>
      {/* Video */}
      <YouTube
        ref={ref}
        videoId={YT_VIDEO_ID}
        className={styles["c-tipping-point__video"]}
        opts={{
          playerVars: {
            controls: 0
          }
        }}
      />

      <button className={styles["c-tipping-point"]} onClick={handleOpenVideo}>
        {/* Pill */}
        <div className={styles["c-tipping-point__pill"]}>
          <div className={styles["c-tipping-point__pill__icon"]}>
            <Icon name="play" type="decorative" />
          </div>
          <p className={styles["c-tipping-point__pill__text"]}>Video</p>
        </div>

        {/* Banner text*/}
        <p className={styles["c-tipping-point__text"]}>Earth Commission’s New Science On Dangerous Tipping Points</p>
      </button>
    </>
  );
};

export default TippingPoint;
