// import { useState } from 'react';
// import Movie from '../components/Movie';

// const MY_API_KEY = '3b62cbd3019cef6ea3bcc5ecce56c01c';
// const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${MY_API_KEY}&language=en-US&include_adult=false`

const Intro = (props) => {
    // const [moviesList, setMoviesList] = useState([]);

    // const mappedMovies = moviesList.map(el => {
    //     return (
    //         <Movie movieobj={el} key={el.id} />
    //     )
    // })

    // const handleSearch = (e) => {
    //     if (e.target.value.length > 2) {
    //         fetch(SEARCH_API + `&query=${e.target.value}`).then(res => res.json()).then(data => {
    //             console.log(data.results);
    //             setMoviesList(data.results);
    //         });
    //     }

    // };

    return (
    
        <section className='Intro'>
                <div className='intro__content'>
                    <h2 className='intro__title'>Добро пожаловать.</h2>
                    <h3 className='intro__text'>Миллионы фильмов, сериалов и людей. Исследуйте сейчас.</h3>
                </div>
                {/* <div className='search'>
                    
                        <form>
                        <label>
                            <input className='search-input' type='text' placeholder='Найти фильм, сериал, персону......' onChange={props.handleSearch} />
                        </label>
                        <input className='button-input' value='Search' />
                    </form>
                   

                </div> */}

          
        </section>


    )
}

export default Intro;