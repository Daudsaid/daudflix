import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "", 
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzIxMGZkZmU3M2I3YjQ1MmE2ZDMxMDI2YjM5Y2UzOCIsIm5iZiI6MTc0Nzk5NzI4Ny44MjcwMDAxLCJzdWIiOiI2ODMwNTI2NzE1NGU2OTFmOGEwMzY0YjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RVyuLcWT2pYgP9WGHmq3RFgewvnRR9YMOrusQJyOIlU"
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results?.[0] || {}))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-2)} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;