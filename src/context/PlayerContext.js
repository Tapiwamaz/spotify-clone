//react
import { createContext, useEffect, useRef, useState } from "react";
//assets
import { songs } from "../assets/music";

import {
  fetchStorage,
  formatTime,
  loadMp3s,
  setLocalStorage,
} from "../helpers/helpers";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const [firstLoad, setFirstLoad] = useState(false);
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songs[0]);
  const [allSongs, setAllSongs] = useState([]);
  const [playingStatus, setPlayingStatus] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

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
    const localStorageSongs = fetchStorage({ key: "ALL_Songs" });

    const fetchMp3s = async () => {
      try {
        const mp3Data = await loadMp3s();

        mp3Data.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        if (!localStorageSongs) {
          setTrack(mp3Data[0]);
          setAllSongs(mp3Data);
        } else if (
          localStorageSongs &&
          localStorageSongs.length < mp3Data.length
        ) {
          setAllSongs(mp3Data);
        }
        setFirstLoad(true);
      } catch (error) {
        console.error("Error loading MP3s:", error);
      }
    };
    if (!firstLoad) {
      if (localStorageSongs) {
        setAllSongs(localStorageSongs);
        setTrack(localStorageSongs[localStorageSongs.length - 2]);
        setFirstLoad(true);
        fetchMp3s();
      } else {
        fetchMp3s();
      }
    }

    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          (audioRef.current.currentTime / audioRef.current.duration) * 100 +
          "%";
        setTime({
          currentTime: {
            second: formatTime(Math.floor(audioRef.current.currentTime % 60)),
            minute: formatTime(Math.floor(audioRef.current.currentTime / 60)),
          },
          totalTime: {
            second: formatTime(Math.floor(audioRef.current.duration % 60)),
            minute: formatTime(Math.floor(audioRef.current.duration / 60)),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  const play = () => {
    audioRef.current.play();
    setPlayingStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    console.log("Paused\n", audioRef.current.currentTime);
    console.log(audioRef.current.duration);
    setPlayingStatus(false);
  };

  const next = async () => {
    const index = allSongs.indexOf(track);
    if (repeat) {
      audioRef.current.currentTime = 0;
      await play();
      return;
    }
    if (shuffle) {
      const nextIndex = Math.round(Math.random() * (allSongs.length - 1));
      await setTrack(allSongs[nextIndex]);
      await play();
      return;
    }
    if (index < allSongs.length - 1) {
      await setTrack(allSongs[index + 1]);
      await play();
      return;
    }
  };
  const previous = async () => {
    const index = allSongs.indexOf(track);
    if (index > 0) {
      await setTrack(allSongs[index - 1]);
      await play();
    }
  };

  const playWithID = async (id) => {
    await setTrack(allSongs[id]);
    await play();
  };

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    firstLoad,
    time,
    playingStatus,
    allSongs,
    shuffle,
    repeat,
    setTrack,
    setTime,
    setPlayingStatus,
    play,
    pause,
    next,
    previous,
    playWithID,
    setRepeat,
    setShuffle,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
