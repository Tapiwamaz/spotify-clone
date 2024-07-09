//css
import "./Album.css"
//react
import { useContext } from "react";
//context
import { PlayerContext } from "../../context/PlayerContext";
//assets
import StockPicture from "../../assets/StockMusic.jpg" 
//rrd
import { NavLink } from "react-router-dom";


const Album = () => {
  const { albums} = useContext(PlayerContext);

  return (
    <>
    <h2 className="subTitle">Albums</h2>
    <section className="cardHolderAlbums">
      {Object.keys(albums).map((item, i) => {
        return (
          <NavLink

            to={`/${item}`}
            key={i}
            className="album songCard albumLink"
          >
            <img
              className="albumPic"
              src={albums[`${item}`].albumArt ? albums[`${item}`].albumArt : StockPicture}
            />
            <h4 className="albumTitle">{item}</h4>
            <h5 className="albumDesc">{albums[`${item}`].artist}</h5>
            
          </NavLink>
        );
      })}
    </section>
  </>
  )
}

export default Album