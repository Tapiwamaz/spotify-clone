//css
import "./Table.css";
//helpers
import { formatDigitalTime , createQueue} from "../../helpers/helpers";
//react
import { useContext } from "react";
//context
import { PlayerContext } from "../../context/PlayerContext";

const Table = ({ album }) => {

  const {playWithIDAlbum ,setQueue,setQueuePosition} = useContext(PlayerContext);
  const queue = createQueue(album.songs)


  return (
    <table className="table" cellSpacing={0}>
      <tr >
        <th className="headerColumn trackNumberHeader">#</th>
        <th className="headerColumn trackTitleHeader">Title</th>
        <th className="headerColumn trackDurationHeader">Duration</th>
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
          <td className="trackTitle">{song.title}</td>
          <td className="trackDuration">{formatDigitalTime(song.duration)}</td>
        </tr>
      ))}
    </table>
  );
};

export default Table;
