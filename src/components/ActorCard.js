import { Link } from "react-router-dom";

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const ActorCard = ({ actorobj }) => {
    return (
            <div className='actors' key={actorobj.credit_id}>
                <img className='actors__image' src={IMAGE_URL + actorobj.profile_path} alt={actorobj.original_name} />
                <h2 className='actors__title'>{actorobj.title ? actorobj.title : actorobj.name}</h2>
                <span className='actors__text'>{actorobj.character ? actorobj.character : actorobj.known_for_department}</span>
            </div>

    )
}

export default ActorCard;