import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BackPageIcon, InstallIcon } from "../../assets/icons/icons";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";
import "./Navbar.css";

const Navbar = ({ type, searchValue, setSearchValue, bgColor }) => {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <nav className="topNav">
      <section className="pageNavigationButtons">
          <button
            disabled={location.pathname === "/"}
            onClick={() => {
              navigate(-1);
            }}
            className="navButton2"
           
          >
            <BackPageIcon />
          </button>
        

        {type === "search" && (
          <div className="searchFieldHolder">
            <MagnifyingGlassIcon className="icon noMargin" />
            <input
              className="searchInput"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="What do you want to play?"
            ></input>
          </div>
        )}
      </section>
      <section className="otherButtons">
        <button className="button">
          <BellIcon
            className="navButton2"
            style={{
              backgroundColor: bgColor
                ? `rgb(${bgColor[0] - 10},${bgColor[1] - 10},${
                    bgColor[2] - 10
                  })`
                : "",
            }}
          />
        </button>
        <button className="button">
          <InstallIcon bgColor={bgColor} />
        </button>
      </section>
    </nav>
  );
};

export default Navbar;
