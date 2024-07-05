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
import { NavLink, Outlet } from "react-router-dom";
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
  const { firstLoad } = useContext(PlayerContext);

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
          <NavLink
            to={"/home"}
            className="button a"
            onClick={() => dispatch({ type: "songs" })}
            style={{
              backgroundColor: !state.songs && "inherit",
              color: !state.songs && "var(--text)",
            }}
          >
            Songs
          </NavLink>
          <NavLink
            to={"/home/albums"}
            className="button a"
            style={{
              backgroundColor: !state.albums && "inherit",
              color: !state.albums && "var(--text)",
            }}
            onClick={() => dispatch({ type: "albums" })}
          >
            Albums
          </NavLink>
          <NavLink
            to={"/home/genres"}
            className="button a"
            style={{
              backgroundColor: !state.genres && "inherit",
              color: !state.genres && "var(--text)",
            }}
            onClick={() => dispatch({ type: "genres" })}
          >
            Genres
          </NavLink>
        </nav>
        <Outlet />
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
