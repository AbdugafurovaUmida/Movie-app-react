import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ActorCard from '../components/ActorCard';
import SimilarCard from '../components/SimilarCard';
import ProgressBar from 'react-animated-progress-bar';






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


    const history = useHistory();
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



    function handleClick() {
        history.goBack();
    }




    const Backdrop = styled.div`
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right top;
    height:650px;
    position: relative;
    `;


    const SingleMovie = styled.div`
        z-index: 22;
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color:rgb(24, 25, 32,0.8);;
    
    `


    const InnerContent = styled.div`
    display:flex;
    padding:30px 0;
    max-width:1200px;
    margin:0 auto;
    z-index:55;
    `

    const ViewMovieInfo = styled.div`
    font-size:20px;
    color: #ffc107;
    padding-top:20px;
    padding-left:30px;
    `

    const Progress = styled.div`
    position:absolute;
    bottom:-30px;
    right:-30px;
    `


    const ContentImg = styled.div`
    position:relative;
    `

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
                        <ContentImg>
                            <img src={IMAGE_URL + movieInfo.poster_path} style={{ height: '500px', borderRadius: '6px', marginTop: '10px' }} className='view-movie__image' />
                            <Progress><ProgressBar width="150" trackWidth="13" percentage={movieInfo.vote_average * 10} /></Progress>
                        </ContentImg>


                        <ViewMovieInfo className='view-movie__info'>
                            <h2 className='view-movie__title' style={{ color: '#fff', textAlign: 'center' }}>{movieInfo.title}({movieInfo.release_date})</h2>
                            <div className='view-movie__genres'>{movieInfo.hasOwnProperty('genres') ? movieInfo.genres.map((genre, index) => (<span key={index}> {genre.name} </span>)) : null}</div>
                            <small></small>
                            <span className='view-movie__time'>{movieInfo.runtime}m</span>

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
                                <h3 className='view-movie__text' style={{ color: '#5a606b', marginTop: '10px' }}>Обзор</h3>
                                <p style={{ letterSpacing: '2px' }}>{movieInfo.overview}</p>
                                <h3 className='view-movie__text' style={{ color: '#5a606b' }}>Создатель</h3>
                                <p>{movieInfo.original_title}</p>
                            </div>
                        </ViewMovieInfo>
                    </InnerContent>
                </SingleMovie>
            </Backdrop>
            <div className='container'>
                <div className='actors-page'>
                    <h2 className='actors-page__title'> Cast Actors</h2>
                    <div className='mapped-actors'>
                        {mappedActors}
                    </div>
                </div>
                <div className='similar-page'>
                    <h2 className='similar-page__title'>Similars</h2>
                    <div className='mapped-similar'>
                        {mappedSimilars}
                    </div>
                </div>
            </div>
                <button className='view-movie__btn' onClick={handleClick}> <i class="fas fa-long-arrow-alt-left"></i>Back</button>
        </div>
    )
}

export default ViewMovie;