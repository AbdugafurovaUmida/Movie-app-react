import React from 'react';
import Select from "react-select";
import { useState, useEffect } from "react";
import { MY_API_KEY } from "../global";
import MovieCard from './MovieCard';

const API_PARAMS = `?api_key=${MY_API_KEY}&language=en-US`;
const GENRES = `https://api.themoviedb.org/3/genre/movie/list${API_PARAMS}`;


const BigFilter = () => {
    const [sort, setSort] = useState("");
    const [year, setYear] = useState("");
    const [total, setTotal] = useState(0);
    const [genre, setGenre] = useState('');
    const [genreList, setGenreList] = useState([]);

    const SORT_BY_ALL = `https://api.themoviedb.org/3/discover/movie?api_key=${MY_API_KEY}&language=en-US&sort_by=${sort}.desc&include_adult=false&page=1&year=${year}&with_genres=${genre}`;

    const [error, setError] = useState();

    useEffect(() => {
        fetch(GENRES)
            .then((res) => {
                if (!res.ok) {
                    throw Error("Serverda ma'lumot olishda xatolik!!");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setGenreList(data.genres);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);


    const handleGenreChange = (newValue) => {
        console.log(newValue);
        const mappedGenre = newValue.map((el) => el.value);
        // men tanlayotgan janrlarimni olib join qilib beradi
        console.log(mappedGenre);
        setGenre(`${mappedGenre}`);
        // setGenre(mappedGenre.join(','));
        // console.log(setGenre(mappedGenre.join('')))
        console.log(`${mappedGenre}`)
    };

    const newGenreArr = genreList.map((el) => {
        return { value: el.id, label: el.name };
    });

    //   ====================================

    const YearOptions = [
        { value: "2000", label: "2000" },
        { value: "2001", label: "2001" },
        { value: "2002", label: "2002" },
        { value: "2003", label: "2003" },
        { value: "2004", label: "2004" },
        { value: "2005", label: "2005" },
        { value: "2006", label: "2006" },
        { value: "2007", label: "2007" },
        { value: "2008", label: "2008" },
        { value: "2009", label: "2009" },
        { value: "2010", label: "2010" },
    ];


    const handleYearChange = (newValue) => {
        setYear(newValue.value);
        console.log(newValue);
    };



    // ====================================

    const sortOptions = [
        { value: "popularity.asc", label: "Popularity" },
        { value: "release_date.asc", label: "Release Date" },
        { value: "revenue.asc", label: "Budget" },
        { value: "vote_average.asc", label: "Rating" },
        { value: "original_title.asc", label: "Title" },
    ];


    const handleSortChange = (newValue) => {
        setSort(newValue.value);
        console.log(newValue);
    };

    //   =================================


    const [discover, setDiscover] = useState([]);

    const handleDiscover = () => {
        fetch(SORT_BY_ALL)
            .then((res) => {
                if (!res.ok) {
                    throw Error("Serverda ma'lumot olishda xatolik!!");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setDiscover(data.results);

                setTotal(data.total_results);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className='big-filter'>
            <form>
                <label className='big-filter__title'> Sort by </label>
                <Select options={sortOptions} onChange={handleSortChange} />

                <label className='big-filter__title'>Year</label>
                <Select options={YearOptions} onChange={handleYearChange}></Select>

                <label className='big-filter__title'>Genre</label>
                <Select options={newGenreArr} isMulti onChange={handleGenreChange}></Select>
                <hr className='big-filter__line' />
                <div className='filter-bottom-blog'>
                    <div>
                        <span className='filter-bottom-blog__title'>Found:   </span>
                        <span className='filter-bottom-blog__total'>{total}</span>
                        <span className='filter-bottom-blog__text'>   movies {" "}</span>
                    </div>
                    <button className='filter-bottom-blog__btn' type="button" onClick={handleDiscover}>
                        <i class="fas fa-search"></i>
                        Search</button>

                </div>
            </form>
<div className='container'>
            <div className='searched-movies'>
                
                    {
                        discover.map((el) => (
                            <div className="movies-wrapper">
                                <MovieCard movieobj={el} key={el.id} />
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default BigFilter