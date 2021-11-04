import { MY_API_KEY } from '../global';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


const GENRES_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${MY_API_KEY}&language=en-US`;


const Genres = () => {
     
    const [ genresList, setGenresList] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        fetch(GENRES_API)
            .then(res => {
                if (!res.ok) {
                    throw Error('serverdan malumot olishda xatolik')
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                setGenresList(data.genres);
            })
            .catch((err) => {
                setError(err.message)
                // console.log(err.message)
            });

    }, []);


    const mappedGenres = genresList.map(el => (
        <div className='catalog-aside' key={el.id}>
            <NavLink activeClassName='active-genre' to ={`/catalog/${el.id}`}>{el.name}</NavLink>
        </div>

    )
        )
   

        return(
            <div className ='genres'>
                {mappedGenres}
            </div>
        )

}

export default Genres;