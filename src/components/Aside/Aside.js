//css
import "./Aside.css";
// icons
import {
  ArrowRightIcon,
  ChevronDoubleDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import NoPlaylist from "./NoPlaylist";
import NoPodcast from "./NoPodcast";

const Aside = () => {
  return (
    <aside className="aside">
      <nav className="nav">
        <a className="navButton" href="/">
          <HomeIcon className="icon" />
          <h3 className="linkText">Home</h3>
        </a>
        <a className="navButton" href="/">
          <MagnifyingGlassIcon className="icon" />
          <h3 className="linkText">Search</h3>
        </a>
      </nav>
      <section className="profiles">
        <nav className="controls">
          <section className="collapseHolder">
            <ChevronDoubleDownIcon className="icon collapse" />
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
