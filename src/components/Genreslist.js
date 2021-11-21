
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import apiCalls from '../config/Api';





const Genres = () => {
     
    const [ genresList, setGenresList] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {

        const getGenres = async () => {
            try{
                const data = await apiCalls.genre({

                });
                setGenresList(data.genres);
            } catch (error) {
                setError(error.message);
            }
        }

        getGenres();

    }, []);


    const mappedGenres = genresList.map(el => (
        <div className='catalog-aside' >
            <NavLink activeClassName='active-genre'  className='catalog-aside__link' key={el.id} to ={`/catalog/${el.id}`}>{el.name}</NavLink>
        </div>

    )
        )
   

        return(
            <div className ='genres'>
                 {error ? <p className='error'>{error}</p> :  mappedGenres }
                
            </div>
        )

}

export default Genres;