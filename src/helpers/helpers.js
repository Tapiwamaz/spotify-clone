// // import jsmediatags from "jsmediatags";

// function importAll(r) {
//   let songsImports = [];
//   r.keys().map((item, index) => { 
//     songsImports.push(r(item));
//   }
//   );
//   return songsImports;
// }
// const songsImports = importAll(require.context('/Users/mazar/Music', false, /\.(mp3)$/));


// export {songsImports };

// src/loadMp3s.js
import jsmediatags from 'jsmediatags';

function importAll(r) {
  let files = r.keys().map((item, index) => r(item));
  return files;
}

const mp3s = importAll(require.context('/Users/mazar/Music', false, /\.mp3$/));

const getMp3Metadata = (fileUrl) => {
  return new Promise((resolve, reject) => {
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        jsmediatags.read(blob, {
          onSuccess: (tag) => {
            const { artist, album, title, picture } = tag.tags;
            let albumArtUrl = '';
            if (picture) {
              const base64String = picture.data
                .map((char) => String.fromCharCode(char))
                .join('');
              albumArtUrl = `data:${picture.format};base64,${window.btoa(base64String)}`;
            }
            resolve({
              src: fileUrl,
              artist,
              album,
              title,
              albumArtUrl,
            });
          },
          onError: (error) => {
            reject(error);
          },
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

const loadMp3s = async () => {
  console.log(mp3s)
  const promises = mp3s.map(getMp3Metadata);
  return Promise.all(promises);
};

export default loadMp3s;
