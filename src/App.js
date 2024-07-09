//router
import { createRoutesFromChildren, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
//layout
import RootLayout from "./layouts/RootLayout";
//pages
import Home from "./pages/Home/Home";
import SearchPage from "./pages/Search/SearchPage";
import Album from "./pages/Album/Album";
import AlbumPage, {
  AlbumPageLoader,
} from "./pages/SpecificAlbumPage/AlbumPage";
import ArtistPage, {
  ArtistPageLoader,
} from "./pages/SpecificArtist/ArtistPage";
import ErrorPage from "./pages/Error/ErrorPage";

//components
import Artists from "./components/Artists/Artists";
import SongsList from "./components/Songs/SongsList";

import { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const { albums, artists } = useContext(PlayerContext);

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Home />}>
          <Route index element={<SongsList />}></Route>
          <Route
            path="albums"
            element={<Album />}
            errorElement={<ErrorPage />}
          ></Route>
          <Route path="artists" element={<Artists />}></Route>
        </Route>
        <Route
          path=":album"
          element={<AlbumPage albums={albums} />}
          loader={AlbumPageLoader}
          errorElement={<ErrorPage />}
        />
        <Route
          path="artist/:artist"
          element={<ArtistPage artists={artists} />}
          loader={ArtistPageLoader}
          errorElement={<ErrorPage />}
        />

        <Route path="search" element={<SearchPage />}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
