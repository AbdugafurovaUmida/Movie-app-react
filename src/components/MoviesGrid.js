// import React, { useState } from 'react'
import { useEffect, useState } from 'react';
import { BY_GENRES } from '../global';
import MovieCard from './MovieCard';
import usePrevious from '../hoooks';
import { MY_API_KEY } from '../global';

const TOP_MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=${MY_API_KEY}`;

const MoviesGrid = (props) => {

    const [movies ,setMovies] = useState([]);
    const [page ,setPage] = useState(1);
    const [totalPage ,setTotalPage] = useState(0);


    const prevGenre = usePrevious(props.genre)


    const loadMore = () => {
          setPage(page + 1);
          console.log(page);
    }

    useEffect(() => {
        let list;
        console.log(prevGenre, props.genre)
        if(prevGenre != props.genre) {
            list = [];
        } else {
            list = movies;
        }
        if(props.genre == undefined){
            fetch(TOP_MOVIES_API).then(res => res.json()).then(data => {
                setMovies(list.concat(data.results))
                setTotalPage(data.total_pages)
            })
        } else {
            fetch(BY_GENRES + props.genre + '&page=' + page ).then(res => res.json()).then(data => {
           
                setMovies(list.concat(data.results))
               setTotalPage(data.total_pages)
            })
        }
    // console.log(props.genre)
    }, [props.genre, page]);


    return (  
            <div className='movies-grid'>
                <h2 className='movies-grid__title'>Movies count: {movies.length} </h2>
                {movies.map((el, i) => <div className ='grids-movie'><MovieCard movieobj={el} key={i}/></div>)}
                {
                    page < totalPage ? <button type='button' className='grids-movie__btn' onClick={loadMore}>Load more</button> : ''
                }
                
            </div>
    )
}

export default MoviesGrid;