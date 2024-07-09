//react
import { useContext, useState } from "react";
//router
import { useLoaderData } from "react-router";
//context
import { PlayerContext } from "../../context/PlayerContext";
//image
import StockPicture from "../../assets/StockMusic.jpg";
//icons
import {
  EllipsisHorizontalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { ShuffleIcon } from "../../assets/icons/icons";
//error
import ErrorPage from "../Error/ErrorPage";
//helpers
import { createQueue, shuffleQueue, sortQueue } from "../../helpers/helpers";
//navbar
import Navbar from "../../components/NavBar/Navbar";
//component
import Table from "../../components/Table/Table";

const ArtistPage = ({ artists }) => {
  const { setQueue, shuffle, setShuffle, setQueuePosition, playWithIDAlbum } =
    useContext(PlayerContext);

  const [options, setOptions] = useState(false);
  const [addedToQueue, setAddedToQueue] = useState(false);

  let artistName =
    useLoaderData().split("")[0].toUpperCase() + useLoaderData().slice(1);
  let artistName2 = useLoaderData();
  const artist = artists[`${artistName}`] ?? artists[`${artistName2}`];

  if (artist) {
    const mins = Math.floor(artist.artistTotalTime / 60);
    const sec = Math.floor(artist.artistTotalTime % 60);

    const colors = artist.avgColor ?? [55, 55, 55];
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
          {artist.albumArt ? (
            <img className="albumImage" src={artist.albumArt} />
          ) : (
            <img className="albumImage" src={StockPicture} />
          )}

          <section className="rightAlbumPageSection">
            <h5>Artist</h5>
            <h1 className="albumName">{artistName}</h1>
            <ul className="infoLine">
              <h5 className="albumArtist">{artist.genre}</h5>{" "}
              <li>
                <p className="extraInfo">
                  {artist.songs.length}
                  {artist.songs.length > 1 ? ` songs` : ` song`}
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
                const queue = createQueue(artist.songs);
                setQueue(queue);
                let queuePosition = 0;
                setAddedToQueue(true);
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
              onClick={() => {
                if (!addedToQueue) {
                  setAddedToQueue(true);
                  const toAdd = createQueue(artist.songs);
                  setQueue((q) => [...q, ...toAdd]);
                }
              }}
              className="plusCircleIcon"
            />
            <EllipsisHorizontalIcon
              className="ellipsisIcon"
              onClick={() => setOptions((s) => !s)}
            />
            <section
              className="optionsMenu"
              style={{ visibility: options ? `` : "hidden" }}
            >
              <button>Add to playlist</button>
              <button>Add to playlist</button>
              <button>Add to playlist</button>
            </section>
          </section>
          <Table artist={artist} />
        </section>
      </main>
    );
  } else {
    return <ErrorPage />;
  }
};

export const ArtistPageLoader = ({ params }) => {
  const { artist } = params;
  const response = artist;
  console.log(response);
  return response;
};

export default ArtistPage;
