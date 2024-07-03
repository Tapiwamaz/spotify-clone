import jsmediatags from "jsmediatags";

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
            console.log(tag.tags);
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
            resolve({
              src: fileUrl,
              artist,
              album,
              title,
              albumArtUrl,
              genre,
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
  console.log(mp3s);
  const promises = mp3s.map(getMp3Metadata);
  return Promise.all(promises);
};

const formatTime = (time) => {
  if (time < 10) return "0" + time;
  return time;
};

const fetchStorage = ({ key }) => {
  return JSON.parse(localStorage.getItem(key));
};
const setLocalStorage = ({ key, value }) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export { loadMp3s, formatTime, fetchStorage, setLocalStorage };
