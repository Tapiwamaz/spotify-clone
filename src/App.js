//router
import { createRoutesFromChildren, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
//layout
import RootLayout from "./layouts/RootLayout";
//pages
import Home from "./pages/Home/Home";
import SearchPage from "./pages/Search/SearchPage";
import SongsList from "./components/Songs/SongsList";
import Album from "./pages/Album/Album";
import Genres from "./components/Genres/Genres";
import AlbumPage, {
  AlbumPageLoader,
} from "./pages/SpecificAlbumPage/AlbumPage";
import ErrorPage from "./pages/Error/ErrorPage";
import { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext";




const App = () => {
  const {albums} = useContext(PlayerContext);

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage/>}>
        <Route path="home" element={<Home />}>
          <Route index element={<SongsList />}></Route>
          <Route path="albums" element={<Album />} errorElement={<ErrorPage/>}></Route>
          <Route path="genres" element={<Genres />}></Route>
        </Route>
        <Route
            path=":album"
            element={<AlbumPage albums={albums}/>}
            loader={AlbumPageLoader}
          />
        <Route path="search" element={<SearchPage />}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
