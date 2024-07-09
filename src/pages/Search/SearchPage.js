//css
import "./SearchPage.css";
//react
import { useState, useContext } from "react";
//pictures

import StockPicture from "../../assets/StockMusic.jpg";
//components
import Navbar from "../../components/NavBar/Navbar";
//context
import { PlayerContext } from "../../context/PlayerContext";
import {
  createAlbumsArray,
  createArtistsArray,
  createQueue,
} from "../../helpers/helpers";
import { useNavigate } from "react-router";

const SearchPage = () => {
  const navigate = useNavigate();
  const { allSongs, playWithIDAlbum, setQueue, setQueuePosition } =
    useContext(PlayerContext);
  const [queueMadeSongs, setQueueMadeSongs] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const filterSongs = allSongs.filter((songs) =>
    songs.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const albums = createAlbumsArray(allSongs);
  const filterAlbums = Object.keys(albums).filter((album) =>
    album.toLowerCase().includes(searchValue.toLowerCase())
  );

  const artists = createArtistsArray(allSongs);
  const filterArtists = Object.keys(artists).filter((artist) =>
    artist.toLowerCase().includes(searchValue.toLowerCase())
  );
  console.log(artists);
  return (
    <main className="searchPage">
      <Navbar
        type="search"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      {searchValue.trim().length > 0 && filterSongs.length > 0 && (
        <h2>Songs</h2>
      )}
      <section className="cardHolder searchHolder">
        {searchValue.trim().length > 0 &&
          filterSongs.map((song, index) => {
            return (
              <article
                key={index}
                className="album songCard"
                onClick={() => {
                  if (!queueMadeSongs) {
                    playWithIDAlbum(song.index);
                    const tempQ = createQueue(filterSongs);
                    setQueue(tempQ);
                    setQueuePosition(index);
                    setQueueMadeSongs(true);
                  } else {
                    playWithIDAlbum(song.index);
                    setQueuePosition(index);
                  }
                }}
              >
                <img
                  className="albumPic"
                  alt={song.title}
                  src={song.albumArtUrl ? song.albumArtUrl : StockPicture}
                />
                <h3 className="albumTitle">
                  {song.title.length >= 25
                    ? song.title.slice(0, 25) + "..."
                    : song.title}
                </h3>
                <h3 className="albumDesc">Song</h3>
              </article>
            );
          })}
      </section>
      {searchValue.trim().length > 0 && filterSongs.length === 0 && (
        <h2>No Songs found</h2>
      )}
      {searchValue.trim().length > 0 && filterAlbums.length === 0 && (
        <h2>No Albums found</h2>
      )}

      {searchValue.trim().length > 0 && filterAlbums.length > 0 && (
        <h2>Albums</h2>
      )}
      <section className="cardHolder searchHolder">
        {searchValue.trim().length > 0 &&
          filterAlbums.map((album, index) => {
            return (
              <article
                key={index}
                className="album"
                onClick={() => {
                  navigate(`/${album}`);
                }}
              >
                <img
                  className="albumPic"
                  alt={album}
                  src={
                    albums[`${album}`].albumArt
                      ? albums[`${album}`].albumArt
                      : StockPicture
                  }
                />
                <h3 className="albumTitle">
                  {album.length >= 25 ? album.slice(0, 25) + "..." : album}
                </h3>
                <h3 className="albumDesc">Album</h3>
              </article>
            );
          })}
      </section>

      {searchValue.trim().length > 0 && filterArtists.length === 0 && (
        <h2>No Artsists found</h2>
      )}

      {searchValue.trim().length > 0 && filterArtists.length > 0 && (
        <h2>Artists</h2>
      )}
      <section className="cardHolder searchHolder">
        {searchValue.trim().length > 0 &&
          filterArtists.map((artist, index) => {
            return (
              <article
                key={index}
                className="album"
                onClick={() => {
                  navigate(`/${artist}`);
                }}
              >
                <img
                  alt={artist}
                  className="albumPic"
                  src={
                    artists[`${artist}`].albumArt
                      ? artists[`${artist}`].albumArt
                      : StockPicture
                  }
                />
                <h3 className="albumTitle">
                  {artist.length >= 25 ? artist.slice(0, 25) + "..." : artist}
                </h3>
                <h3 className="albumDesc">Artist</h3>
              </article>
            );
          })}
      </section>
    </main>
  );
};

export default SearchPage;
