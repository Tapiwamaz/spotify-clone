import "./SongBar.css";
import songPic from "../../assets/Alfredo.jpg";
import { HeadphoneIcon, PlayIcon, ShuffleIcon } from "../../assets/icons/icons";

const SongBar = () => {
  return (
    <footer>
      <section className="songDescription">
        <img className="songPic" src={songPic} />
        <article className="songDetails">
          <h4 className="songName">Skinny suge</h4>
          <ul className="songArtists">
            <li>
              <h5 className="songArtist">Freddy Gibbs</h5>
            </li>
            <li className="comma">,</li>
            <li>
              <h5 className="songArtist">Alchemist</h5>
            </li>
          </ul>
        </article>
      </section>
      <section className="songModifiers">
        <section className="modifiers">
          <svg className="icon shuffle" />
          <ShuffleIcon/>
          <svg className="icon previous" />
          <svg className="icon play" />
          <svg className="icon next" />
          <svg className="icon repeat" />
        </section>
        <section className="timeBar"></section>
      </section>
      <section className="songControls">
        <PlayIcon/>
        <HeadphoneIcon/>
        <svg className="icon repeat" />
        <svg className="icon repeat" />
        <svg className="icon repeat" />
      </section>
    </footer>
  );
};

export default SongBar;
