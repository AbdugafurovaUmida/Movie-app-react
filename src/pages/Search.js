import React from 'react'
import BigFilter from '../components/BigFilter';
import { useState, useEffect } from 'react';
import { MY_API_KEY } from '../global';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';


const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${MY_API_KEY}&language=en-US&include_adult=false`
const TRENDING_MOVIES_API = `https://api.themoviedb.org/3/trending/all/day?api_key=${MY_API_KEY}`;


const Search = () => {

    const [moviesList, setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();



    // useEffect(() => {
    //     setTimeout(() => {
    //         fetch(TRENDING_MOVIES_API)
    //             .then(res => {
    //                 if (!res.ok) {
    //                     throw Error('serverdan malumot olishda xatolik')
    //                 }
    //                 return res.json()
    //             })
    //             .then(data => {
    //                 setMoviesList([]);
    //                 //  console.log(data.results)
    //                 setIsLoading(false);
    //             })
    //             .catch((err) => {
    //                 setIsLoading(false);
    //                 setError(err.message)
    //                 // console.log(err.message)
    //             });
    //     }, 2000)
    // }, []);
    const mappedMovies = moviesList.map(el => {
        return (
            <MovieCard movieobj={el} key={el.id} />
        )
    })
    const handleSearch = (e) => {
        if (e.target.value.length > 2) {
            fetch(SEARCH_API + `&query=${e.target.value}`)
                .then(res => {
                    if (!res.ok) {
                        throw Error('serverdan malumot olishda xatolik')
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data.results);
                    setMoviesList(data.results);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setError(err.message)
                    // console.log(err.message)
                });

        }
    };
    return (
        <div className='container'>
            <div className='big-search'>
                <label className='big-search__title'>Search All Movies</label>
                <input className='big-search__input' type='text' onChange={handleSearch} placeholder='Search...' />
                </div>
                <BigFilter />
                {error ? <p className='error'>{error}</p> : ''}
                {isLoading ? <Loader /> : ''}
                {!isLoading && !error ? mappedMovies : ''}
            
        </div>

    )
}

export default Search;
