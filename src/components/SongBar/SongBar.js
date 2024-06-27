//css
import "./SongBar.css";
//pictures
import songPic from "../../assets/Alfredo.jpg";
//icons
import {
  FullScreenIcon,
  HeadphoneIcon,
  MiniPlayerIcon,
  NextIcon,
  OtherDevicesIcon,
  PlayIcon,
  PreviousIcon,
  QueueIcon,
  RepeatIcon,
  ShuffleIcon,
  VolumeIcon,
} from "../../assets/icons/icons";

//songs
import { songs } from "../../assets/music";

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
          <ShuffleIcon />
          <PreviousIcon />
          <PlayIcon />
          <NextIcon />
          <RepeatIcon />
        </section>
        <section className="timeBar">
          <p className="time">1:06</p>
          <hr className="bar"></hr>
          <p className="time">1:06</p>
          <audio controls>
            <source src={songs[0]} type="audio/mpeg"></source>
          </audio>
        </section>
      </section>
      <section className="songControls">
        <OtherDevicesIcon />
        <QueueIcon />
        <HeadphoneIcon />
        <VolumeIcon />
        <hr className="bar" />
        <MiniPlayerIcon />
        <FullScreenIcon />
      </section>
    </footer>
  );
};

export default SongBar;
