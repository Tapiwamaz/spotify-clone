//react
import { createContext, useEffect, useRef, useState } from "react";
//assets
import { songs } from "../assets/music";

import loadMp3s from "../helpers/helpers";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songs[0]);
  const [allSongs, setAllSongs] = useState("songs");
  const [playingStatus, setPlayingStatus] = useState(false);

  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  useEffect(() => {
    const fetchMp3s = async () => {
      try {
        const mp3Data = await loadMp3s();
        setAllSongs(mp3Data);
        setTrack(mp3Data[mp3Data.length - 2]);
      } catch (error) {
        console.error("Error loading MP3s:", error);
      }
    };
    fetchMp3s();
  }, []);

  const play = () => {
    audioRef.current.play();
    setPlayingStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    console.log("Paused\n", audioRef.current.currentTime);
    console.log( audioRef.current.duration);
    setPlayingStatus(false);
  };

  const next = () => {
    const index = allSongs.indexOf(track);
    if (index < allSongs.length - 1) {
      setTrack(allSongs[index + 1]);
      setPlayingStatus(false);
    }
  };
  const previous = () => {
    const index = allSongs.indexOf(track);
    if (index > 0) {
      setTrack(allSongs[index - 1]);
      setPlayingStatus(false);
    }
  };

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    time,
    setTime,
    setPlayingStatus,
    playingStatus,
    play,
    pause,
    next,
    previous,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
