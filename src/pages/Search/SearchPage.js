//router
import { NavLink, useNavigate } from "react-router-dom";
//icons
import {
  BackPageIcon,
  BellIcon,
  InstallIcon,
  NextPageIcon,
} from "../../assets/icons/icons";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

//css
import "./SearchPage.css";
import { useState } from "react";

//pictures
import { pictures } from "../../assets/pictures";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <main className="searchPage">
      <nav className="topNav">
        <section className="pageNavigationButtons">
          <NavLink 
          // onClick={ goBack}
          >
            <BackPageIcon />
          </NavLink>
          <NavLink 
          // onClick={goForward}
          >
            <NextPageIcon />
          </NavLink>
          <div className="searchFieldHolder">
            <MagnifyingGlassIcon className="icon noMargin" />
            <input
              className="searchInput"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="What do you want to play?"
            ></input>
          </div>
        </section>
        <section className="otherButtons">
          <button className="button">
            <BellIcon />
          </button>
          <button className="button">
            <InstallIcon />
          </button>
        </section>
      </nav>

      <h2>Recent searches</h2>
      <section className="cardHolder searchHolder">
        {pictures.Artists.map((item, i) => {
          return (
            <article key={i} className="album">
              <img src={item.src} />
              <h3 >{item.title}</h3>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default SearchPage;
