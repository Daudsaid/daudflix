import { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzIxMGZkZmU3M2I3YjQ1MmE2ZDMxMDI2YjM5Y2UzOCIsIm5iZiI6MTc0Nzk5NzI4Ny44MjcwMDAxLCJzdWIiOiI2ODMwNTI2NzE1NGU2OTFmOGEwMzY0YjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RVyuLcWT2pYgP9WGHmq3RFgewvnRR9YMOrusQJyOIlU',
    },
  };

  const handleScroll = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const fetchUrl = `https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`;
    fetch(fetchUrl, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const ref = cardsRef.current;
    ref.addEventListener('wheel', handleScroll);
    return () => ref.removeEventListener('wheel', handleScroll);
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={'https://image.tmdb.org/t/p/w500' + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;