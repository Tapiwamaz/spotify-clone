//css
import "./Artists.css"
//react
import { useContext } from "react";
//react-router
import {  NavLink} from "react-router-dom"
//pictures
import StockPicture from "../../assets/StockMusic.jpg"
//context
import { PlayerContext } from "../../context/PlayerContext";
//helpers
import { createArtistsArray} from "../../helpers/helpers";


const Artists = () => {
  const {allSongs} = useContext(PlayerContext)
  const artists = createArtistsArray(allSongs);
    return (
      <>
      <h2 className="subTitle">Albums</h2>
      <section className="cardHolderAlbums">
        {Object.keys(artists).map((item, i) => {
          return (
            <NavLink
              to={`/artist/${item}`}
              key={i}
              className="album songCard albumLink"
            >
              <img
                className="albumPic"
                alt={item}
                src={artists[`${item}`].albumArt ? artists[`${item}`].albumArt : StockPicture}
              />
              <h4 className="albumTitle">{item}</h4>
              
            </NavLink>
          );
        })}
      </section>
    </>
    )
  
}

export default Artists