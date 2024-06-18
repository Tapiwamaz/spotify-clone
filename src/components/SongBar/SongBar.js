import "./SongBar.css";
import songPic from "../../assets/Alfredo.jpg";
import ShuffleIcon from "../../assets/Shuffle.svg";

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
          <svg className="icon shuffle"/>
          <svg className="icon previous"/>
          <svg className="icon play"/>
          <svg className="icon next"/>
          <svg className="icon repeat"/>
          </section>
          <section className="timeBar"></section>
      </section>
      <section className="songControls"></section>
    </footer>
  );
};

export default SongBar;
