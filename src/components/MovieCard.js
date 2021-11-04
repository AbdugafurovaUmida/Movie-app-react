import { Link } from "react-router-dom";

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movieobj }) => {
    return (
        <Link to={`/movie/${movieobj.id}`} className='movie' key={movieobj.id}>
            <img className='movie__image' src={IMAGE_URL + movieobj.poster_path} alt={movieobj.title} />
            <div className='movie__info'>
                <h2 className='movie__title'>{movieobj.title ? movieobj.title : movieobj.name}</h2>
            </div>
            {/* <Link to={`/movie/${movieobj.id}`}>View this movie</Link> */}
        </Link>
    )
}

export default MovieCard;