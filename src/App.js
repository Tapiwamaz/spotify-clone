//router
import { createRoutesFromChildren, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
//layout
import RootLayout from "./layouts/RootLayout";
//pages
import Home from "./pages/Home/Home";
import SearchPage from "./pages/Search/SearchPage";



const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route  path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}></Route>
      <Route path="search" element={<SearchPage/>}></Route>
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App