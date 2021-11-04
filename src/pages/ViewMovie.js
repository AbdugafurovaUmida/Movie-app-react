import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ActorCard from '../components/ActorCard';
import SimilarCard from '../components/SimilarCard';





import { MY_API_KEY } from '../global';
import { ORIGINAL_IMAGE_URL } from '../global';



const SINGLE_MOVIE_API = `https://api.themoviedb.org/3/movie/`;
const API_PARAMS = `?api_key=${MY_API_KEY}&language=en-US&include_adult=false`;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const ACTOR_API = `https://api.themoviedb.org/3/movie/`
const ACTOR_API_PARAMS = `/credits?api_key=${MY_API_KEY}`
const SIMILAR_API = `https://api.themoviedb.org/3/movie/`
const SIMILAR_API_PARAMS = `/similar?api_key=${MY_API_KEY}`














const ViewMovie = () => {



    const [movieInfo, setMovieInfo] = useState({});
    const [actorsInfo, setActorsInfo] = useState([]);
    const [similarInfo, setSimilarInfo] = useState([]);


    const { id } = useParams()


    useEffect(() => {
        console.log(id)
        fetch(SINGLE_MOVIE_API + id + API_PARAMS).then(res => res.json())
            .then(data => {
                console.log(data)
                setMovieInfo(data)

            })

        fetch(ACTOR_API + id + ACTOR_API_PARAMS).then(res => res.json())
            .then(data => {
                setActorsInfo(data.cast)
                // console.log(data)
            })


        fetch(SIMILAR_API + id + SIMILAR_API_PARAMS).then(res => res.json())
            .then(data => {
                // console.log(data)
                setSimilarInfo(data.results)
            })
    }, [id]);






    const Backdrop = styled.div`
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right top -100px;
    // height: 100%;
    `;


    const SingleMovie = styled.div`
    // padding:40px 50px;
    `


    const InnerContent = styled.div`
    display:flex;
    padding:30px 0;
    // padding:30px 40px ;
    max-width:1200px;
    margin:0 auto;
    `

    const ViewMovieInfo = styled.div`
    color:#fff;
    // display: flex;
    // flex-wrap: wrap;
    // align-items: flex-start;
    // align-content: center;
    // box-sizing: border-box;
    // padding-left: 40px;
    `

    // const PosterPath = styled.div`
    // display: block;
    // width: 100%;
    // min-width: 100%;
    // height: 100%;
    // min-height: 100%;
    // border-width: 0px;
    // outline: none;
    // `

    const mappedActors = actorsInfo.map((el) => {
        return (
            <ActorCard actorobj={el} key={el.id} />
        )
    })



    const mappedSimilars = similarInfo.map((el) => {
        return (
            <SimilarCard similarobj={el} key={el.id} />
        )
    })

    return (
        <div>
            <Backdrop className='view-movie' style={{ backgroundImage: `url(${ORIGINAL_IMAGE_URL + movieInfo.backdrop_path})` }}>
                <SingleMovie className='single-movie'>
                    <InnerContent className='inner-content'>
                        <div>
                            <img src={IMAGE_URL + movieInfo.poster_path} className='view-movie__image' />
                        </div>
                        <ViewMovieInfo className='view-movie__info'>
                            <h2 className='view-movie__title' style={{ color: '#fff' }}>{movieInfo.title}</h2>
                            <div>{movieInfo.release_date}</div>
                            <span className='movie__genres'>{movieInfo.hasOwnProperty('genres') ? movieInfo.genres.map((genre, index) => (<span key={index}> {genre.name} </span>)) : null}</span>
                            <small>..</small>
                            <span className='movie__time'>{movieInfo.runtime}</span>

                            {/* <div class="progress">
                            <span class="title timer" data-from="0" data-to="85" data-speed="1800">85</span>
                            <div class="overlay"></div>
                            <div class="left"></div>
                            <div class="right"></div>
                        </div> */}
                            {/* <Progress strokeLinecap="square" type="circle" percent={movieInfo.vote_average * 10} /> */}

                            {/* 
                        <div className="progress-container">
                            <div className="progress">
                                <span
                                    className="title timer"
                                    data-from="0"
                                    data-to={movieInfo.vote_average}
                                    data-speed="1500"
                                >
                                    {movieInfo.vote_average * 10}%
                                </span>
                                <div className="overlay"></div>
                                <div className="left"></div>
                                <div className="right"></div>
                            </div>
                        </div> */}
                            <div>


                                <h3>Обзор</h3>
                                <p>{movieInfo.overview}</p>
                                <h4>{movieInfo.original_title}</h4>
                                <p>Создатель</p>
                            </div>
                        </ViewMovieInfo>
                    </InnerContent>
                </SingleMovie>
            </Backdrop>
            <h2>Similars</h2>
            <div className='mapped-similar'>
                
                {mappedSimilars}
            </div>
             <h2>Actors</h2>
            <div className='mapped-actors'>
               
                {mappedActors}
            </div>
            <button className='view-movie__btn'>Back</button>
        </div>





    )
}

export default ViewMovie;