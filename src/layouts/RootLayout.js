//router
import { Outlet, useLocation } from "react-router";
//css
import "./RootLayout.css";
//components
import SongBar from "../components/SongBar/SongBar";
import Aside from "../components/Aside/Aside";
//react
import { useContext } from "react";
//context
import { PlayerContext } from "../context/PlayerContext";


const RootLayout = () => {
  const { audioRef, track, firstLoad  } = useContext(PlayerContext);


  return (
    <main className="rootLayout">
      <section className="topSection">
        <Aside></Aside>
        {firstLoad ? (
          <Outlet />
        ) : (
          <main className="homepage">
            <div className="loader"></div>
            <div className="loader2"></div>
          </main>
        )}
      </section>
      <SongBar></SongBar>
      <audio ref={audioRef} src={track.src} preload="auto"></audio>
    </main>
  );
};

export default RootLayout;
