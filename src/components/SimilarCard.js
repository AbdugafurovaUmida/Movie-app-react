import { Link } from "react-router-dom";

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const SimilarCard = ({ similarobj }) => {
    return (
            <div className='similars' key={similarobj.credit_id}>
                <img className='similars__image' src={IMAGE_URL + similarobj.poster_path} alt={similarobj.original_name} />
                <h2 className='similars__title'>{similarobj.title ? similarobj.title : similarobj.name}</h2>
                <Link to={`/movie/${similarobj.id}`}>View this movie</Link>
            </div>

    )
}

export default SimilarCard;