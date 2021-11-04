import React from 'react'
import Movie from './MovieCard';
import Loader from '../components/Loader';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

import { MY_API_KEY } from '../global';
import MovieCard from './MovieCard';



// const TRENDING_MOVIES_API = `https://api.themoviedb.org/3/trending/all/day?api_key=${MY_API_KEY}`;
// const POPULAR_MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=${MY_API_KEY}`;
// const UPCOMING_MOVIES_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${MY_API_KEY}`;
// const TOP_MOVIES_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=${MY_API_KEY}`;


const Movielist = ({type,title}) => {
    SwiperCore.use([Autoplay]);

    const [moviesList, setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();


    useEffect(() => {
        setTimeout(() => {
            fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${MY_API_KEY}`)
                .then(res => {
                    if (!res.ok) {
                        throw Error('serverdan malumot olishda xatolik')
                    }
                    return res.json()
                })
                .then(data => {
                    setMoviesList(data.results);
                    //  console.log(data.results)
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setError(err.message)
                    // console.log(err.message)
                });
        }, 2000)
    }, []);

    return (
        <div className = 'container'>
            <div className = 'main'>
                <h2 className = 'main__title'>{title}</h2>
              </div>
              
                {error ? <p className='error'>{error}</p> : ''}
                {isLoading ? <Loader /> : ''}
                {!isLoading && !error ? <Swiper modules = {[Autoplay]} spaceBetween={30} slidesPerView={7}
                autoplay={{
                    delay: 2000, 
                    disableOnInteraction: false
                }}>
                {moviesList.map(el => ( <SwiperSlide><MovieCard movieobj={el} key={el.id} /></SwiperSlide> ))} </Swiper> : ''}
        </div>
    )
}

export default Movielist
