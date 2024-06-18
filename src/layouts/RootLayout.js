import { Outlet } from "react-router"
import "./RootLayout.css"
import SongBar from "../components/SongBar/SongBar"
import Aside from "../components/Aside/Aside"

const RootLayout = () => {
  return (
    <main className="rootLayout">
      <section className="topSection">
        <Aside></Aside>
        <Outlet/>
      </section>
      <SongBar></SongBar>
    </main>
  )
}

export default RootLayout