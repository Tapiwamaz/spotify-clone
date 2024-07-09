//css
import "./Home.css";
//router
import { NavLink, Outlet , useLocation} from "react-router-dom";
//react
import { useContext, useReducer } from "react";
//context
import { PlayerContext } from "../../context/PlayerContext";
//components
import Navbar from "../../components/NavBar/Navbar";

function reducer(state, action) {
  switch (action.type) {
    case "songs":
      return { songs: true, albums: false, artists: false };
    case "albums":
      return { songs: false, albums: true, artists: false };
    case "artists":
      return { songs: false, albums: false, artists: true };
    default:
      return state;
  }
}

const Home = () => {
  const { firstLoad } = useContext(PlayerContext);
  const location = useLocation();

  const [state, dispatch] = useReducer(reducer, {
    songs: location.pathname === "/",
    artists: location.pathname === "/artists",
    albums: location.pathname === "/albums",
  });

  if (firstLoad) {
    return (
      <main className="homepage">
        
        <Navbar type="normal"/>

        <nav className="pageNav">
          <NavLink
            to={"/"}
            className="btn"
            onClick={() => dispatch({ type: "songs" })}
            style={{
              backgroundColor: !state.songs && "inherit",
              color:  state.songs && "var(--text)",
              outlineColor: state.songs && "var(--text)",
            }}
          >
            Songs
          </NavLink>
          <NavLink
            to={"/albums"}
            className="btn"
            style={{
              backgroundColor: !state.albums && "inherit",
              color:  state.albums && "var(--text)",
              outlineColor: state.albums && "var(--text)",
            }}
            onClick={() => dispatch({ type: "albums" })}
          >
            Albums
          </NavLink>
          <NavLink
            to={"/artists"}
            className="btn"
            style={{
              backgroundColor: !state.artists && "inherit",
              color:  state.artists && "var(--text)",
              outlineColor: state.artists && "var(--text)",
            }}
            onClick={() => dispatch({ type: "artists" })}
          >
            Artists
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
