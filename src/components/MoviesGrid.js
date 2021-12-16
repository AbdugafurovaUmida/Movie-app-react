import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import usePrevious from '../hoooks';
import apiCalls from '../config/Api';

const MoviesGrid = (props) => {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [error, setError] = useState();


    const prevGenre = usePrevious(props.genre)


    const loadMore = () => {
        setPage(page + 1);
        console.log(page);
    }

    useEffect(() => {
        let list;
        console.log(prevGenre, props.genre)
        if (prevGenre !== props.genre) {
            list = [];
        } else {
            list = movies;
        }
        if (props.genre === undefined) {

            const getGenresMovies = async () => {
                try {
                    const data = await apiCalls.getMovies('top_rated');
                    setMovies(list.concat(data.results))
                    setTotalPage(data.total_pages)
                } catch (error) {
                    setError(error.message);
                }

            }
            getGenresMovies()
        } else {

            const getGenres = async () => {
                try {
                    const data = await apiCalls.discover({
                        language: 'en-US',
                        include_adult: false,
                        with_genres: props.genre,
                        page
                    });
                    setMovies(list.concat(data.results))
               setTotalPage(data.total_pages)

                }catch (error){
                    setError(error.message)
                }
            }
            getGenres()

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.genre, page]);


    return (
        <div className='movies-grid'>
            <h2 className='movies-grid__title'>Movies count: {movies.length} </h2>
            {error ? <p className='error'>{error}</p> :
            movies.map((el, i) => <div className='grids-movie'><MovieCard movieobj={el} key={i} /></div>)
            }
            {
                page < totalPage ? <button type='button' className='grids-movie__btn' onClick={loadMore}>Load more</button> : ''
            }

        </div>
    )
}

export default MoviesGrid;