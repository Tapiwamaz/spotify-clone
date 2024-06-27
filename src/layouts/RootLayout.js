import { Outlet } from "react-router"
import "./RootLayout.css"
import SongBar from "../components/SongBar/SongBar"
import Aside from "../components/Aside/Aside"

// import {useHistoryStack} from "../helpers/helpers"

const RootLayout = () => {
// const {push,goBack,goForward,historyStack,forwardStack} = useHistoryStack();
// console.log(historyStack)
  return (
    <main className="rootLayout">
      <section className="topSection">
        <Aside></Aside>
        <Outlet />
      </section>
      <SongBar></SongBar>
    </main>
  )
}

export default RootLayout