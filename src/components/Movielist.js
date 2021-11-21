import React from 'react'
import Loader from '../components/Loader';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import MovieCard from './MovieCard';
import apiCalls from '../config/Api';



const Movielist = ({type,title}) => {
    SwiperCore.use([Autoplay]);

    const [moviesList, setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();


    useEffect(() => {
        
        const getMovies = async () => {
            try{
                const data = await apiCalls.getMovies(type);
                setMoviesList(data.results);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
            }
        }

        getMovies();

        
    }, []);

    return (
        <div className = 'container'>
            <div className = 'main'>
                <h2 className = 'main__title'>{title}</h2>
              </div>
              
                {error ? <p className='error'>{error}</p> : ''}
                {isLoading ? <Loader /> : ''}
                {!isLoading && !error ? <Swiper
                 modules = {[Autoplay]} 
                 spaceBetween={30} 
                 slidesPerView={7}
                autoplay={{
                    delay: 2000, 
                    disableOnInteraction: false
                }}
                breakpoints={{
                    "200": {
                        "slidesPerView": 1,
                        "spaceBetween": 10
                      },
                    "320": {
                        "slidesPerView": 1,
                        "spaceBetween": 10
                      },
                    "400": {
                        "slidesPerView": 2,
                        "spaceBetween": 0
                      },
                    "640": {
                      "slidesPerView": 3,
                      "spaceBetween": 30
                    },
                    "768": {
                      "slidesPerView": 4,
                      "spaceBetween": 40
                    },
                    "991": {
                        "slidesPerView": 5,
                        "spaceBetween": 30
                      },
                    "1199": {
                        "slidesPerView": 7,
                        "spaceBetween": 30
                      }
                  }}
                >
                {moviesList.map(el => ( <SwiperSlide><MovieCard movieobj={el} key={el.id} /></SwiperSlide> ))} </Swiper> : ''}
        </div>
    )
}

export default Movielist
