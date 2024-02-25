"use client";

// React
import { FC, useEffect, Dispatch, SetStateAction, useMemo } from "react";

// React use audio player
import { useGlobalAudioPlayer } from "react-use-audio-player";

// React Hotkeys hook
import { useHotkeys } from "react-hotkeys-hook";

// Custom Hooks
import useGetAudioURL from "@/customHooks/useGetAudioURL";

interface IProps {
  audioURL: string;
  autoPlayAudio?: boolean;
  hotKey?: boolean;
  size?: "sm";
  setHotKeyPressed?: Dispatch<SetStateAction<boolean>>;
  disableTooltip?: boolean;
}

const NewAudioButton: FC<IProps> = ({
  audioURL,
  autoPlayAudio,
  size,
  hotKey,
  setHotKeyPressed,
  disableTooltip,
}) => {
  const { load, isReady, play, playing, src } = useGlobalAudioPlayer();

  const fullAudioURL = useGetAudioURL(audioURL);

  const handleListenClick = () => {
    if (playing) {
      return;
    }

    if (src !== fullAudioURL) {
      load(fullAudioURL, { autoplay: true, html5: true, format: "mp3" });
    } else {
      play();
    }
  };

  useEffect(() => {
    load(
      fullAudioURL,
      { autoplay: autoPlayAudio, html5: true, format: "mp3" }
      // { autoplay: autoPlayAudio, html5: true, format: "mp3" } This is the correct format to fix the mobile issue
    );
  }, [fullAudioURL, autoPlayAudio]);

  useHotkeys(
    "shift+space",
    () => {
      if (isReady && hotKey && !playing) {
        if (setHotKeyPressed) {
          setHotKeyPressed(true);
        }

        handleListenClick();
        setTimeout(() => {
          if (setHotKeyPressed) {
            setHotKeyPressed(false);
          }
        }, 500);
      }
    },
    {
      enableOnFormTags: ["input", "select", "textarea"],
    }
  );

  if (disableTooltip) {
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-lg bg-black p-4 text-secondary hover:text-white"
        onClick={handleListenClick}
      >
        <svg
          className={size === "sm" ? "h-5 w-5" : "h-7 w-7"}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 16"
        >
          <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
        </svg>
      </button>
    );
  }

  return (
    <div
      className="tooltip"
      data-tip={`Listen ${hotKey ? "(Shift+Space)" : ""}`}
    >
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-lg bg-black p-4 text-secondary hover:text-white"
        onClick={handleListenClick}
      >
        <svg
          className={size === "sm" ? "h-5 w-5" : "h-7 w-7"}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 16"
        >
          <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
        </svg>
      </button>
    </div>
  );
};

export default NewAudioButton;
