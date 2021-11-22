import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { ORIGINAL_IMAGE_URL } from '../global';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';
import apiCalls from '../config/Api';


const DiscoverSlide = styled.div`
 background-position:center center;
 background-size:cover;
 background-repeat:no-repeat;
`


const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const Slider = () => {

    const [sliderList, setSliderList] = useState([]);
    const [error, setError] = useState();



    useEffect(() => {

        const getPopularMovies = async () => {
            try{
                const data = await apiCalls.getMovies('popular');
                setSliderList(data.results.slice(0, 3));
                
            } catch (error) {
                setError(error.message);
            }
        }

        getPopularMovies();

    }, []);



    const mappedSliders = sliderList.map(el => (
        <SwiperSlide key={el.id}>
            <DiscoverSlide className='discover-slide' style={{ backgroundImage: `url(${ORIGINAL_IMAGE_URL + el.backdrop_path})` }}>
                <div className='discover'>
                    <img src={IMAGE_URL + el.poster_path} className='discover__image' alt='discover-image'/>
                    <div className='discover-info'>
                        <h2 className='discover-info__title' style={{ color: '#fff',fontSize:'28px' }}>{el.title}</h2>
                        <p className='discover-info__text' style={{ color: '#9cb6d6', fontSize:'18px' }}>{el.overview}</p>
                        
                        <div className='circular-progress-content' style={{ width: 40, height: 40, backgroundColor:'black',borderRadius:'50%', padding:'2px',marginBottom:'15px'}}>
                            <CircularProgressbar value={el.vote_average * 10} text={`${el.vote_average * 10}%`}  styles={buildStyles({ backgroundColor: '#d6d6d6'})}/>
                        </div>
                        <Link className='discover-info__link' to={`/movie/${el.id}`}>View</Link>
                    </div>
                </div>
            </DiscoverSlide>
        </SwiperSlide>
    ))





    return (
        <div className='slide'>
            {error ? <p className='error'>{error}</p> : ''}
            <Swiper
             modules={[Autoplay]}
              grabCursor={true}
               spaceBetween={0} 
               slidesPerView={1} 
               loop autoplay={{ delay: 3000, disableOnInteraction: false }}
               >
                {mappedSliders}
            </Swiper>
        </div>
    )
}

export default Slider;
