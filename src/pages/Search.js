import React from 'react'
import BigFilter from '../components/BigFilter';
import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import apiCalls from '../config/Api';



const Search = () => {

    const [moviesList, setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const handleSearch = (e) => {
        if (e.target.value.length > 2) {

            const search = async () => {
                try {
                    const data = await apiCalls.search({
                        language: "en-US",
                        include_adult: false,
                        query: e.target.value,
                    });
                    setMoviesList(data.results);
                } catch (error) {
                    setError(error.message)
                }
            }

            search();
        }
    };

    setTimeout(() => {
        setIsLoading(false);
    }, 2000)
    return (
        <div className='container'>
            <div className='big-search'>
                <label className='big-search__title'>Search All Movies</label>
                <input className='big-search__input' type='text' onChange={handleSearch} placeholder='Search...' />
                <BigFilter />
                <div className='searchable-movies'>
                    {error ? <p className='error'>{error}</p> :
                        moviesList.map((el) => (
                            <div className="movies-wrapper">
                                <MovieCard movieobj={el} key={el.id} />
                            </div>
                        ))}
                    {isLoading ? <Loader /> : ''}
                </div>

            </div>

        </div>

    )
}

export default Search;
