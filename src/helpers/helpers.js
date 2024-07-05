import jsmediatags from "jsmediatags";
import { getImageData, getAverageColor } from "./colours";

function importAll(r) {
  let files = r.keys().map((item, index) => r(item));
  return files;
}

const mp3s = importAll(require.context("/Users/mazar/Music", false, /\.mp3$/));

const getMp3Metadata = (fileUrl) => {
  return new Promise((resolve, reject) => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        jsmediatags.read(blob, {
          onSuccess: (tag) => {
            const { artist, album, title, picture, genre } = tag.tags;
            let albumArtUrl = "";
            if (picture) {
              const base64String = picture.data
                .map((char) => String.fromCharCode(char))
                .join("");
              albumArtUrl = `data:${picture.format};base64,${window.btoa(
                base64String
              )}`;
            }

            const audio = new Audio(fileUrl);
            audio.addEventListener("loadedmetadata", () => {
              resolve({
                src: fileUrl,
                artist,
                album,
                title,
                albumArtUrl,
                genre,
                duration: audio.duration,
              });
            });
          },
          onError: (error) => {
            reject(error);
          },
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const loadMp3s = async () => {
  const promises = mp3s.map(getMp3Metadata);
  return Promise.all(promises);
};

const formatTime = (time) => {
  if (time < 10) return "0" + time;
  return time;
};

const formatDigitalTime = (timeInSeconds) => {
  const mins = formatTime(Math.floor(timeInSeconds / 60));
  const sec = formatTime(Math.floor(timeInSeconds % 60));

  return String(mins) + ":" + String(sec);
};

const fetchStorage = ({ key }) => {
  return JSON.parse(localStorage.getItem(key));
};
const setLocalStorage = ({ key, value }) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const createAlbumsArray = (allSongs) => {
  const albums = {};
  for (const index in allSongs) {
    const song = allSongs[index];
    if (albums[`${song.album}`]) {
      albums[`${song.album}`].songs = [...albums[`${song.album}`].songs, song];
      albums[`${song.album}`]["albumDuration"] =
        albums[`${song.album}`]["albumDuration"] + song.duration;
      albums[`${song.album}`]["length"] = 1 + albums[`${song.album}`]["length"];
    } else {
      albums[`${song.album}`] = { songs: [] };
      albums[`${song.album}`].songs = [song];
      albums[`${song.album}`]["length"] = 1;
      albums[`${song.album}`]["albumDuration"] = song.duration;
    }
    albums[`${song.album}`]["artist"] = song.artist;
    albums[`${song.album}`]["albumArt"] = song.albumArtUrl;
    albums[`${song.album}`]["genre"] = song.genre;
  }
  Object.keys(albums).forEach((key) => {
    if (albums[key].albumArt) {
      getImageData(albums[key].albumArt)
        .then((imageData) => {
          const color = getAverageColor(imageData);
          albums[key]["avgColor"] = color;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
  return albums;
};

const createQueue = (songs) => {
  const queue = [];
  songs.map((song, index) => {
    queue.push(song.index);
  });
  return queue;
};

const shuffleQueue = (queue) => {
  let currentIndex = queue.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = queue[currentIndex];
    queue[currentIndex] = queue[randomIndex];
    queue[randomIndex] = temporaryValue;
  }

  return queue;
};

const sortQueue = (queue) => {
  queue.sort((a, b) => a - b);
  return queue;
};

export {
  loadMp3s,
  formatTime,
  fetchStorage,
  setLocalStorage,
  createAlbumsArray,
  formatDigitalTime,
  createQueue,
  shuffleQueue,
  sortQueue,
};
