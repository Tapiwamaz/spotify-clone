//react
import { createContext, useEffect, useRef, useState } from "react";
//assets
import { songs } from "../assets/music";

import {
  fetchStorage,
  formatTime,
  loadMp3s,
  setLocalStorage,
  createAlbumsArray,
  createArtistsArray,
  createQueue,
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
  const [queue, setQueue] = useState([]);
  const [queuePosition, setQueuePosition] = useState(0);
  const [albums, setAlbums] = useState({});
  const [artists, setArtists] = useState({});
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

    // does the searc in the local folder to find and preprocess mp3 files
    // with their metadata and also create genre and albums objects
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

        mp3Data.map((item, index) => {
          return item["index"] = index;
        });

        if (!localStorageSongs) {
          setTrack(mp3Data[0]);
          setTime({
            currentTime: {
              second: formatTime(0),
              minute: formatTime(0),
            },
            totalTime: {
              second: formatTime(Math.floor(mp3Data[0].duration % 60)),
              minute: formatTime(Math.floor(mp3Data[0].duration / 60)),
            },
          });

          setAllSongs(mp3Data);
          setAlbums(createAlbumsArray(mp3Data));
          setArtists(createArtistsArray(mp3Data))
          setLocalStorage({ key: "ALL_Songs", value: mp3Data });
          setQueue(createQueue(mp3Data));
          setQueuePosition(0);
        } else if (
          localStorageSongs &&
          localStorageSongs.length < mp3Data.length
        ) {
          setAllSongs(mp3Data);
          setLocalStorage({ key: "ALL_Songs", value: mp3Data });
          setAlbums(createAlbumsArray(mp3Data));
          setArtists(createArtistsArray(mp3Data))

        }
        setFirstLoad(true);
      } catch (error) {
        console.error("Error loading MP3s:", error);
      }
    };

    if (!firstLoad) {
      if (localStorageSongs) {
        setAllSongs(localStorageSongs);
        setTrack(localStorageSongs[0]);
        setQueue(createQueue(localStorageSongs));
        setQueuePosition(0);
        setTime({
          currentTime: {
            second: formatTime(0),
            minute: formatTime(0),
          },
          totalTime: {
            second: formatTime(Math.floor(localStorageSongs[0].duration % 60)),
            minute: formatTime(Math.floor(localStorageSongs[0].duration / 60)),
          },
        });
        setFirstLoad(true);
        setAlbums(createAlbumsArray(localStorageSongs));
        setArtists(createArtistsArray(localStorageSongs))


        fetchMp3s();
      } else {
        fetchMp3s();
      }
    }
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setPlayingStatus(false);
      };
    }

    setTimeout(() => {
      audioRef.current.onended = () => {
        next();
      }
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
    console.log("Queue: ", queue )
    console.log("QueuePos: ", queuePosition )
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayingStatus(false);
  };

  const next = async () => {
    console.log(queue);
    if (queue.length === 0) {
      return;
    }
    if (queue.length === 1) {
      audioRef.current.currentTime = 0;
      await play();
      return;
    }

    if (repeat) {
      audioRef.current.currentTime = 0;
      await play();
      return;
    }

    let nextIndex = queuePosition + 1;
    if (nextIndex >= queue.length) {
      nextIndex = 0;
    }
    await setQueuePosition(nextIndex)
    await setTrack(allSongs[queue[nextIndex]]);
    await play();
    return;

  };
  const previous = async () => {
    if (queuePosition > 0) {
      let nextIndex = queuePosition-1
      await setTrack(allSongs[queue[nextIndex]]);
      await setQueuePosition(nextIndex)
      await play();
    }
    else {
      audioRef.current.currentTime = 0;
      await play();
      return;
    }
  };

  const playWithID = async (id) => {
    await setQueue(createQueue(allSongs))
    function getIndex(element) {
      return element === id;
    }
    const index = queue.findIndex(getIndex) 
    await setQueuePosition(index);
    await setTrack(allSongs[id]);
    await play();
  };

  const playWithIDAlbum = async (id) => {
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
    albums,
    shuffle,
    repeat,
    queue,
    queuePosition,
    artists,
    setArtists,
    setTrack,
    setQueue,
    setQueuePosition,
    setTime,
    setPlayingStatus,
    play,
    pause,
    next,
    previous,
    playWithID,
    setRepeat,
    setShuffle,
    playWithIDAlbum,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
