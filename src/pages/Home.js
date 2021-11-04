// import { Swiper, SwiperSlide } from 'swiper/react'
// import { useState, useEffect } from 'react';
import Movielist from '../components/Movielist';
// import Loader from '../components/Loader';
import Intro from '../components/Intro';
import Slider from '../components/Slider';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';


// import { MY_API_KEY } from '../global';


// const MY_API_KEY = '3b62cbd3019cef6ea3bcc5ecce56c01c';
// const TRENDING_MOVIES_API = `https://api.themoviedb.org/3/trending/all/day?api_key=${MY_API_KEY}`;
// const POPULAR_MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=${MY_API_KEY}`;
// const UPCOMING_MOVIES_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${MY_API_KEY}`;
// const TOP_MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=${MY_API_KEY}`;

// const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${MY_API_KEY}&language=en-US&include_adult=false`


const { TabPane } = Tabs;


function callback(key) {
  console.log(key);
}


const Demo = ({ title }) => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab={`${title = 'Upcoming movies'}`} key="1">
      <Movielist type='upcoming' />
      {/* <Slider /> */}
    </TabPane>
    <TabPane tab={`${title = 'Top movies'}`} key="2">
      <Movielist type='top_rated' />
    </TabPane>
    <TabPane tab={`${title = 'Popular movies'}`} key="3">
      <Movielist type='popular' />
    </TabPane>
  </Tabs>
);




const Home = () => {

  // const [moviesList, setMoviesList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState();

  // useEffect(() => {
  //     setTimeout(() => {
  //         fetch(TRENDING_MOVIES_API)
  //             .then(res => {
  //                 if (!res.ok) {
  //                     throw Error('serverdan malumot olishda xatolik')
  //                 }
  //                 return res.json()
  //             })
  //             .then(data => {
  //                 setMoviesList(data.results);
  //                 //  console.log(data.results)
  //                 setIsLoading(false);
  //             })
  //             .catch((err) => {
  //                 setIsLoading(false);
  //                 setError(err.message)
  //                 // console.log(err.message)
  //             });
  //     }, 2000)
  // }, []);

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
    <div className="page-content">
      <Intro />
      <div className='container'>
        <Link className='main__link' to='/catalog'>All</Link>
        <Demo />
      </div>
      <Slider />
      {/* <Movielist type='upcoming' title='Upcoming movies' />
            <Movielist type='top_rated' title='Top movies' />
            <Movielist type='popular' title='Popular movies' /> */}

      {/* <Intro handleSearch={handleSearch} /> */}

      {/* <div className='player'> */}
      {/* <h2>Top Movies</h2>
            <Swiper spaceBetween={30} slidesPerView={7}>
                    {moviesList.map(el => ( <SwiperSlide><Movie movieobj={el} key={el.id} /></SwiperSlide> ))}
                    <SwiperSlide>1</SwiperSlide>
                    <SwiperSlide>2</SwiperSlide>
                    <SwiperSlide>3</SwiperSlide>
                    <SwiperSlide>4</SwiperSlide>
                </Swiper> */}
      {/* {error ? <p className='error'>{error}</p> : ''} */}
      {/* <input type='text' placeholder='Search' onChange={handleSearch} /> */}
      {/* {isLoading ? <Loader /> : ''}
                {!isLoading && !error ? mappedMovies : ''} */}

      {/* </div> */}







    </div>
  );
}

export default Home;