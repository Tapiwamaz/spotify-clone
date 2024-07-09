//css
import "./Table.css";
//helpers
import { formatDigitalTime , createQueue} from "../../helpers/helpers";
//react
import { useContext } from "react";
//context
import { PlayerContext } from "../../context/PlayerContext";
import { ClockIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const Table = ({ album ,artist}) => {

  const {playWithIDAlbum ,setQueue,setQueuePosition} = useContext(PlayerContext);
  const queue = artist ? createQueue(artist.songs) : createQueue(album.songs);

  if (album) {
  return (
    <table className="table" cellSpacing={"1"}>
      <tr >
        <th className="headerColumn trackNumberHeader">#</th>
        <th className="headerColumn trackTitleHeader">Title</th>
        <th className="headerColumn trackDurationHeader">
          <ClockIcon width={25}/></th>
      </tr>
      {album.songs.map((song, i) => (
        <tr 
        className="tableRow" key={i}
        onClick={() => { 
          playWithIDAlbum(song.index)
          setQueue(queue)
          setQueuePosition(i)
          console.log("Queue: ", queue )
        }
        }
        >
          <td className="trackNumber">{i + 1}</td>
          <td className="trackTitle">
            <p>{song.title}</p>
            <NavLink to={`/artist/${song.artist}`} className="navLink artistNameAttribute songArtist">{song.artist}</NavLink></td>
          <td className="trackDuration">{formatDigitalTime(song.duration)}</td>
        </tr>
      ))}
    </table>
  );
}
else {

   return (
    <table className="table" cellSpacing={"1"}>
      <tr >
        <th className="headerColumn trackNumberHeader">#</th>
        <th className="headerColumn trackTitleHeader">Title</th>
        <th className="headerColumn trackDurationHeader">
          <ClockIcon width={25}/></th>
      </tr>
      {artist.songs.map((song, i) => (
        <tr 
        className="tableRow" key={i}
        onClick={() => { 
          playWithIDAlbum(song.index)
          setQueue(queue)
          setQueuePosition(i)
          console.log("Queue: ", queue )
        }
        }
        >
          <td className="trackNumber">{i + 1}</td>
          <td className="trackTitle">
            <p>{song.title}</p>
            <NavLink to={`/${song.album}`} className="navLink artistNameAttribute songArtist">{song.album}</NavLink></td>
          <td className="trackDuration">{formatDigitalTime(song.duration)}</td>
        </tr>
      ))}
    </table>
  );

}
}

export default Table;
