//css
import "./Home.css";
//images
import { pictures } from "../../assets/pictures";
import StockPicture from "../../assets/StockMusic.jpg";
//icons
import {
  BackPageIcon,
  NextPageIcon,
  BellIcon,
  InstallIcon,
} from "../../assets/icons/icons";
//router
import { NavLink } from "react-router-dom";
//react
import { useContext, useReducer } from "react";
//context
import { PlayerContext } from "../../context/PlayerContext";

function reducer(state, action) {
  switch (action.type) {
    case "songs":
      return { songs: true, albums: false, genres: false };
    case "albums":
      return { songs: false, albums: true, genres: false };
    case "genres":
      return { songs: false, albums: false, genres: true };
    default:
      return state;
  }
}

const Home = () => {
  const { allSongs, playWithID, firstLoad } = useContext(PlayerContext);

  const [state, dispatch] = useReducer(reducer, {
    songs: true,
    genres: false,
    albums: false,
  });

  if (firstLoad) {
    return (
      <main className="homepage">
        <nav className="topNav">
          <section className="pageNavigationButtons">
            <NavLink>
              <BackPageIcon />
            </NavLink>
            <NavLink>
              <NextPageIcon />
            </NavLink>
          </section>
          <section className="otherButtons">
            <button className="button">
              <BellIcon />
            </button>
            <button className="button">
              <InstallIcon />
            </button>
          </section>
        </nav>
        <nav className="pageNav">
          <button
            className="button"
            onClick={() => dispatch({ type: "songs" })}
            style={{
              backgroundColor: !state.songs && "inherit",
              color: !state.songs && "var(--text)",
            }}
          >
            Songs
          </button>
          <button
            className="button"
            style={{
              backgroundColor: !state.albums && "inherit",
              color: !state.albums && "var(--text)",
            }}
            onClick={() => dispatch({ type: "albums" })}
          >
            Albums
          </button>
          <button
            className="button"
            style={{
              backgroundColor: !state.genres && "inherit",
              color: !state.genres && "var(--text)",
            }}
            onClick={() => dispatch({ type: "genres" })}
          >
            Genres
          </button>
        </nav>
        <h2 className="subTitle">Songs</h2>
        <section className="cardHolder">
          {allSongs.map((item, i) => {
            return (
              <article key={i} className="album songCard" onClick={() => playWithID(i)}>
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
      </main>
    );
  } else {
    return (
      <main className="homepage">
        <div className="loader"></div>
      </main>
    );
  }
};

export default Home;
