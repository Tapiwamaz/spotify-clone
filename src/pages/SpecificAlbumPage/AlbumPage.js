//react
import React from "react";
//router
import { useLoaderData } from "react-router";
//errorpage
import ErrorPage from "../Error/ErrorPage";
//css
import "./AlbumPage.css";
//assets
import StockPicture from "../../assets/StockMusic.jpg";
//components
import Table from "../../components/Table/Table";


const AlbumPage = ({ albums }) => {


  let albumName =
    useLoaderData().split("")[0].toUpperCase() + useLoaderData().slice(1);
  let albumName2 = useLoaderData();
  const album = albums[`${albumName}`] ?? albums[`${albumName2}`];
  const mins = Math.floor(album.albumDuration / 60);
  const sec = Math.floor(album.albumDuration % 60);

  const colors = album.avgColor ?? [55, 55, 55];

  if (album) {
    return (
      <main
        className="albumPage"
        style={{
          background: `linear-gradient(180deg, rgb(${colors[0]},${colors[1]},${colors[2]}) 50%, var(--darkLightdark) 70%)`,
        }}
      >
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
          <section className="controlsAlbumPage"></section>
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
