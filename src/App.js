
import { createRoutesFromChildren, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home/Home";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route  path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}></Route>
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App