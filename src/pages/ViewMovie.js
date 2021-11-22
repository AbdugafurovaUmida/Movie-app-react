import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import styled from 'styled-components';
import ActorCard from '../components/ActorCard';
import SimilarCard from '../components/SimilarCard';
import ProgressBar from 'react-animated-progress-bar';
import apiCalls from '../config/Api';
import { ORIGINAL_IMAGE_URL } from '../global';


const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';


const ViewMovie = () => {


    const history = useHistory();
    const [movieInfo, setMovieInfo] = useState({});
    const [actorsInfo, setActorsInfo] = useState([]);
    const [similarInfo, setSimilarInfo] = useState([]);
    const [error, setError] = useState();


    const { id } = useParams()


    useEffect(() => {


        const detail = async () => {
            try{
                const data = await apiCalls.detail(id);
                setMovieInfo(data)
            }catch(error){
                setError(error.message);
            }
        }

        detail();

        const actorsAndCast = async () => {
            try{
                const data = await apiCalls.actorsAndCast(id);
                setActorsInfo(data.cast)
            }catch(error){
                setError(error.message);
            }
        }

        actorsAndCast();

        const similar = async () => {
            try{
                const data = await apiCalls.similar(id);
                setSimilarInfo(data.results)
            }catch(error){
                setError(error.message);
            }
        }

        similar();

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
    @media only screen and (max-width:767px){
        max-height:450px;
    }
    @media only screen and (max-width:565px){
        max-height:250px;
    }
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
    @media only screen and (max-width:1250px){
        padding:30px 20px;

    }
    @media only screen and (max-width:1199px){
        max-width: 100%;
        padding: 30px 50px;
    }
    @media only screen and (max-width:767px){
        justify-content:center;
    }
    `

    const ViewMovieInfo = styled.div`
    font-size:20px;
    color: #ffc107;
    padding-top:20px;
    padding-left:30px;
    @media only screen and (max-width:767px){
        padding-left:0px;
        text-align:center;
    }
    `

    const Progress = styled.div`
    position:absolute;
    bottom:-30px;
    right:-30px;
    `


    const ContentImg = styled.div`
    position:relative;
    @media only screen and (max-width:767px){
        margin-top: 50px;
    }

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
        <>
        {error ? <p className='error'>{error}</p> :  
          <div>
            <Backdrop className='view-movie' style={{ backgroundImage: `url(${ORIGINAL_IMAGE_URL + movieInfo.backdrop_path})`,backgroundPosition:'center center' }}>
                <SingleMovie className='single-movie'>
                    <InnerContent className='inner-content'>
                        <ContentImg>
                            <img src={IMAGE_URL + movieInfo.poster_path} style={{ maxHeight: '500px', borderRadius: '6px', marginTop: '10px' }} className='view-movie__image' alt='single-image' />
                            <Progress><ProgressBar width="150" trackWidth="13" percentage={movieInfo.vote_average * 10} /></Progress>
                        </ContentImg>


                        <ViewMovieInfo className='view-movie__info'>
                            <h2 className='view-movie__title' style={{ color: '#fff', textAlign: 'center' }}>{movieInfo.title}({movieInfo.release_date})</h2>
                            <div className='view-movie__genres'>{movieInfo.hasOwnProperty('genres') ? movieInfo.genres.map((genre, index) => (<span key={index}> {genre.name} </span>)) : null}</div>
                            <small></small>
                            <span className='view-movie__time'>{movieInfo.runtime}m</span>
                            <div>
                                <h3 className='view-movie__text' style={{ color: '#5a606b', marginTop: '10px' }}>Обзор</h3>
                                <div className='view-movie__text-scroll' style={{  overflow:'scroll',overflowStyle: 'none', scrollbarHeight: '1px'}}>
                                <p  className='view-movie__description' style={{ letterSpacing: '2px'}}>{movieInfo.overview}</p>
                                </div>
                                <h3 className='view-movie__text'>Создатель</h3>
                                <p  className='view-movie__description'>{movieInfo.original_title}</p>
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
                <button className='view-movie__btn' onClick={handleClick}> <i className="fas fa-long-arrow-alt-left"></i>Back</button>
        </div>}
     
        </>
    )
}

export default ViewMovie;