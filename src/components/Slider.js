import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import { MY_API_KEY } from '../global';
import { ORIGINAL_IMAGE_URL } from '../global';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';
// import Circle from 'react-circle';


const DiscoverSlide = styled.div`
 background-position:center center;
 background-size:contain;
 background-repeat:no-repeat;
`


// const POPULAR_MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=${MY_API_KEY}`;

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const Slider = () => {

    const [sliderList, setSliderList] = useState([]);
    const [error, setError] = useState();



    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${MY_API_KEY}`)
            .then(res => {
                if (!res.ok) {
                    throw Error('serverdan malumot olishda xatolik')
                }
                return res.json()
            })
            .then(data => {
                setSliderList(data.results.slice(0, 3));
                console.log(data.results.slice(0, 3))
            })
            .catch((err) => {
                setError(err.message)
                // console.log(err.message)
            });

    }, []);



    const mappedSliders = sliderList.map(el => (
        <SwiperSlide key={el.id}>
            <DiscoverSlide className='discover-slide' style={{ backgroundImage: `url(${ORIGINAL_IMAGE_URL + el.backdrop_path})` }}>
                <div className='discover'>
                    <img src={IMAGE_URL + el.poster_path} className='view-movie__image' />
                    <div className='discover-info'>
                        <h2 className='discover-info__title' style={{ color: '#fff' }}>{el.title}</h2>
                        <p className='discover-info__text'>{el.overview}</p>
                        
                        {/* <div style={{ width: 40, height: 40, backgroundColor:'black',borderRadius:'50%', padding:'2px',marginBottom:'15px'}}>
                            <CircularProgressbar value={el.vote_average * 10} text={`${el.vote_average * 10}%`}  styles={buildStyles({ backgroundColor: '#d6d6d6'})}/>
                        </div> */}
                        {/* <div class="progress">
                            <span class="progress-bar" >{el.vote_average * 10} </span>
                        </div> */}
                        {/* <span className='discover-info__rating'>{el.vote_average}</span> */}
                        <Link className='discover-info__link' to={`/movie/${el.id}`}>View</Link>
                    </div>
                </div>
            </DiscoverSlide>
        </SwiperSlide>
    ))





    return (
        <div className='slide'>
            {error ? <p className='error'>{error}</p> : ''}
            <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={1} loop autoplay={{ delay: 3000, disableOnInteraction: false }}>
                {mappedSliders}
            </Swiper>
        </div>
    )
}

export default Slider;
