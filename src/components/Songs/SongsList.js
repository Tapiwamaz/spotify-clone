import { useContext } from "react";
import "./SongsList.css";
import { PlayerContext } from "../../context/PlayerContext";
import StockPicture from "../../assets/StockMusic.jpg"

const SongsList = () => {
const {allSongs,playWithID} = useContext(PlayerContext);

  return (
    <>
      <h2 className="subTitle">Songs</h2>
      <section className="cardHolderSongs">
        {allSongs.map((item, i) => {
          return (
            <article
              key={i}
              className="album songCard"
              onClick={() => playWithID(i)}
            >
              <img
                className="albumPic"
                src={item.albumArtUrl ? item.albumArtUrl : StockPicture}
              />
              <h4 className="albumTitle">{item.title}</h4>
              <h5 className="albumDesc">{item.artist}</h5>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default SongsList;
