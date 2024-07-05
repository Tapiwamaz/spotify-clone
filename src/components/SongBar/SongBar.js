//css
import "./SongBar.css";
//pictures
import StockPicture from "../../assets/StockMusic.jpg";
//icons
import {
  FullScreenIcon,
  HeadphoneIcon,
  MiniPlayerIcon,
  NextIcon,
  OtherDevicesIcon,
  PlayIcon,
  PreviousIcon,
  QueueIcon,
  RepeatIcon,
  ShuffleIcon,
  VolumeIcon,
} from "../../assets/icons/icons";
//react
import { useContext } from "react";
//context
import { PlayerContext } from "../../context/PlayerContext";
//icons
import { PauseCircleIcon } from "@heroicons/react/24/solid";
import { shuffleQueue, sortQueue } from "../../helpers/helpers";

const SongBar = () => {
  const {
    time,
    seekBar,
    seekBg,
    playingStatus,
    play,
    pause,
    track,
    next,
    previous,
    repeat,
    setRepeat,
    setShuffle,
    shuffle,
    setQueue,
    setQueuePosition,
  } = useContext(PlayerContext);

  return (
    <footer>
      <section className="songDescription">
        {track.albumArtUrl ? (
          <img className="songPic" src={track.albumArtUrl} />
        ) : (
          <img className="songPic" src={StockPicture} />
        )}

        <article className="songDetails">
          <h4 className="songName">{track.title}</h4>
          <ul className="songArtists">
            <li>
              <h5 className="songArtist">{track.artist}</h5>
            </li>
          </ul>
        </article>
      </section>
      <section className="songModifiers">
        <section className="modifiers">
          <svg
            className={`icon ${shuffle ? "green" : ""}`}
            onClick={() => {
              setQueue((q) => {
                if (!shuffle) return shuffleQueue(q);
                else return sortQueue(q);
              });

              setQueuePosition((x) => 0);
              setShuffle((s) => !s);
            }}
          >
            <ShuffleIcon />
          </svg>
          <svg className="icon" onClick={previous}>
            <PreviousIcon />
          </svg>
          {!playingStatus ? (
            <svg className="icon" onClick={play}>
              <PlayIcon />
            </svg>
          ) : (
            <svg className="icon" onClick={pause}>
              <PauseCircleIcon className="icon" />
            </svg>
          )}
          <svg className="icon" onClick={next}>
            <NextIcon />
          </svg>
          <svg
            className={`icon ${repeat ? "green" : ""}`}
            onClick={() => setRepeat((r) => !r)}
          >
            <RepeatIcon />
          </svg>
        </section>
        <section className="timeBar">
          <p className="time">
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div ref={seekBg} className="bar background">
            <hr ref={seekBar} className="bar songBar"></hr>
          </div>
          <p className="time">
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </section>
      </section>
      <section className="songControls">
        <OtherDevicesIcon />
        <QueueIcon />
        <HeadphoneIcon />
        <VolumeIcon />
        <hr className="bar volumeBar" />
        <MiniPlayerIcon />
        <FullScreenIcon />
      </section>
    </footer>
  );
};

export default SongBar;
