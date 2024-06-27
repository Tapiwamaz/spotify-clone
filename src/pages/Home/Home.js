//css
import "./Home.css";
//images
import { pictures } from "../../assets/pictures";
//icons
import {
  BackPageIcon,
  NextPageIcon,
  BellIcon,
  InstallIcon,
} from "../../assets/icons/icons";
//router
import { NavLink } from "react-router-dom";
import { useReducer } from "react";


function reducer(state, action) {
  switch (action.type) {
    case "all":
      return { all: true, music: false, podcast: false };
    case "music":
      return { all: false, music: true, podcast: false };
    case "podcast":
      return { all: false, music: false, podcast: true };
    default:
      return state;
  }
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, {
    all: true,
    podcast: false,
    music: false,
  });

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
        <button className="button" 
        onClick={() => dispatch({ type: "all" })}
        style={{ backgroundColor: !state.all && "inherit",color: !state.all && "var(--text)" }}
        >
          All
        </button>
        <button
          className="button"
          style={{ backgroundColor: !state.music && "inherit",color: !state.music && "var(--text)" }}
          onClick={() => dispatch({ type: "music" })}
        >
          Music
        </button>
        <button
          className="button"
          style={{ backgroundColor: !state.podcast && "inherit",color: !state.podcast && "var(--text)" }}
          onClick={() => dispatch({ type: "podcast" })}
        >
          Podcast
        </button>
      </nav>
      <h2 className="subTitle">Featured Charts</h2>
      <section className="cardHolder">
        {pictures.Charts.map((item, i) => {
          return (
            <article key={i} className="album">
              <img className="albumPic" src={item.src} />
              <h4 className="albumTitle">{item.title}</h4>
              <h5 className="albumDesc">{item.desc}</h5>
            </article>
          );
        })}
      </section>
      <h2 className="subTitle">Today's biggest hits</h2>

      <section className="cardHolder">
        {pictures.Charts.map((item, i) => {
          return (
            <article key={i} className="album">
              <img className="albumPic" src={item.src} />
              <h4 className="albumTitle">{item.title}</h4>
              <h5 className="albumDesc">{item.desc}</h5>
            </article>
          );
        })}
      </section>
      <h2 className="subTitle">Today's biggest hits</h2>

      <section className="cardHolder">
        {pictures.Charts.map((item, i) => {
          return (
            <article key={i} className="album">
              <img className="albumPic" src={item.src} />
              <h4 className="albumTitle">{item.title}</h4>
              <h5 className="albumDesc">{item.desc}</h5>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default Home;
