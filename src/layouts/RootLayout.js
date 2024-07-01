//router
import { Outlet } from "react-router";
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
  const { audioRef, track } = useContext(PlayerContext);
 

  return (
    <main className="rootLayout">
      <section className="topSection">
        <Aside></Aside>
        <Outlet />
      </section>
      <SongBar></SongBar>
      <audio ref={audioRef} src={track.src} preload="auto"></audio>
    </main>
  );
};

export default RootLayout;
