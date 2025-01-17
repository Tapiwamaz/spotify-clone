//react
import React, { useContext, useState } from "react";
//router
import { useLoaderData } from "react-router";
//errorpage
import ErrorPage from "../Error/ErrorPage";
//css
import "./AlbumPage.css";
//assets
import StockPicture from "../../assets/StockMusic.jpg";
import { ShuffleIcon } from "../../assets/icons/icons";
//icons
import {
  PlusCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
//components
import Table from "../../components/Table/Table";
import Navbar from "../../components/NavBar/Navbar";
//context
import { PlayerContext } from "../../context/PlayerContext";
import { createQueue, shuffleQueue, sortQueue } from "../../helpers/helpers";


const AlbumPage = ({ albums }) => {
  const { setQueue, shuffle, setShuffle, setQueuePosition, playWithIDAlbum } =
    useContext(PlayerContext);

  const [options, setOptions] = useState(false);
  const [addedToQueue,setAddedToQueue] = useState(false)

  let albumName =
    useLoaderData().split("")[0].toUpperCase() + useLoaderData().slice(1);
  let albumName2 = useLoaderData();
  const album = albums[`${albumName}`] ?? albums[`${albumName2}`];

  if (album) {
    const mins = Math.floor(album.albumDuration / 60);
    const sec = Math.floor(album.albumDuration % 60);

    const colors = album.avgColor ?? [55, 55, 55];
    return (
      <main
        className="albumPage"
        style={{
          background: `linear-gradient(180deg, rgb(${colors[0]},${colors[1]},${colors[2]}) 50%, var(--darkLightdark) 70%)`,
        }}
      >
        <Navbar type={"normal"} bgColor={colors} />
        <section
          className="topAlbumPageSection"
          style={{
            backgroundColor: `rgb(${colors[0]},${colors[1]},${colors[2]})`,
          }}
        >
          {album.albumArt ? (
            <img className="albumImage" src={album.albumArt} />
          ) : (
            <img className="albumImage" src={StockPicture} />
          )}

          <section className="rightAlbumPageSection">
            <h5>Album</h5>
            <h1 className="albumName">{albumName}</h1>
            <ul className="infoLine">
              <h5 className="albumArtist">{album.artist}</h5>{" "}
              <li>
                <p className="extraInfo">
                  {album.songs.length}
                  {album.songs.length > 1 ? ` songs` : ` song`}
                  {`, ` + mins + " mins " + sec + " sec"}
                </p>
              </li>
            </ul>
          </section>
        </section>

        <section className="bottomAlbumPage">
          <section className="controlsAlbumPage">
            <PlayCircleIcon
              className="playAlbumIcon"
              onClick={() => {
                const queue = createQueue(album.songs);
                setQueue(queue);
                let queuePosition = 0;
                setAddedToQueue(true)
                if (!shuffle) {
                  setQueuePosition(queuePosition);
                } else {
                  queuePosition = Math.floor(Math.random() * queue.length);
                  setQueuePosition(0);
                }
                console.log("Queue position: " + queuePosition);
                playWithIDAlbum(queue[queuePosition]);
              }}
            />
            <svg
              className={`shuffleAlbumIcon ${shuffle ? "green" : ""}`}
              onClick={() => {
                setQueue((q) => {
                  if (!shuffle) return shuffleQueue(q);
                  else return sortQueue(q);
                });

                setQueuePosition((x) => 0);
                setShuffle((s) => !s);
              }}
            >
              <ShuffleIcon />
            </svg>
            <PlusCircleIcon 
              onClick={()=>{
                if (!addedToQueue){
                setAddedToQueue(true);
                const toAdd = createQueue(album.songs)
                setQueue(q => [...q,...toAdd])
              }
              }}
            className="plusCircleIcon" 
            />
            <EllipsisHorizontalIcon className="ellipsisIcon" onClick={() => setOptions(s => !s)}/>
            <section 
            className="optionsMenu" 
            style={{visibility: options ? `` :"hidden"}} >
              <button>Add to playlist</button>
              <button>Add to playlist</button>
              <button>Add to playlist</button>
            </section>
          </section>
          <Table album={album} />
        </section>
      </main>
    );
  } else {
    return <ErrorPage />;
  }
};

export default AlbumPage;

export const AlbumPageLoader = ({ params }) => {
  const { album } = params;

  const response = album;
  return response;
};
