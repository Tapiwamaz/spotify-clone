//css
import "./Aside.css";
// icons
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {HomeIcon, LibraryIcon,HomeOutlineIcon,MagnifyingGlassFilledIcon} from "../../assets/icons/icons"


import NoPlaylist from "./NoPlaylist";
import NoPodcast from "./NoPodcast";
import { useLocation} from "react-router";
import {  NavLink} from "react-router-dom"

const Aside = () => {

  const location = useLocation();

  return (
    <aside className="aside">
      <nav className="nav">
        <NavLink className="navButton" to="/home"  >
          {location.pathname === "/home" ?  <HomeIcon className="icon" /> : <HomeOutlineIcon className="icon" />}
          <h3 className="linkText">Home</h3>
        </NavLink>
        <NavLink className="navButton" to="/search">
          {location.pathname === "/search" ? <MagnifyingGlassFilledIcon className="icon" /> : <MagnifyingGlassIcon className="icon" />}
          <h3 className="linkText">Search</h3>
        </NavLink>
      </nav>
      <section className="profiles">
        <nav className="controls">
          <section className="collapseHolder">
            <LibraryIcon className="icon collapse" />
            <label className="label">Your Library</label>
          </section>
          <ul className="profilesModifiers">
            <li className="plus">
              <PlusIcon className="icon" />
            </li>
            <li className="arrow">
              <ArrowRightIcon className="icon" />
            </li>
          </ul>
        </nav>
        <NoPlaylist />
        <NoPodcast />
      </section>
    </aside>
  );
};

export default Aside;
