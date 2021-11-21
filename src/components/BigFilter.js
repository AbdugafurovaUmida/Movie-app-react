import React from 'react';
import Select from "react-select";
import { useState, useEffect } from "react";
import MovieCard from './MovieCard';
import apiCalls from '../config/Api';


const BigFilter = () => {
    const [sort, setSort] = useState("");
    const [year, setYear] = useState("");
    const [total, setTotal] = useState(0);
    const [genre, setGenre] = useState('');
    const [genreList, setGenreList] = useState([]);

    const [error, setError] = useState();

    useEffect(() => {

        const getGenres = async () => {
            try {
                const data = await apiCalls.genre();
                setGenreList(data.genres);
            } catch (error) {
                setError(error.message)
            }
        }

        getGenres();

    }, []);


    const handleGenreChange = (obj) => {
        console.log(obj);
        const mappedGenre = obj.map((el) => el.value);
        console.log(mappedGenre);
        setGenre(`${mappedGenre}`);
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


    const handleYearChange = (obj) => {
        setYear(obj.value);
        console.log(obj.value);
    };



    // ====================================

    const sortOptions = [
        { value: "popularity.asc", label: "Popularity" },
        { value: "release_date.asc", label: "Release Date" },
        { value: "revenue.asc", label: "Budget" },
        { value: "vote_average.asc", label: "Rating" },
        { value: "original_title.asc", label: "Title" },
    ];


    const handleSortChange = (obj) => {
        setSort(obj.value);
        console.log(obj.value);
    };

    //   =================================


    const [discover, setDiscover] = useState([]);

    const handleDiscover = () => {


        const discover = async () => {
            try {
                const data = await apiCalls.discover({
                    language: "en-US",
                    include_adult: false,
                    with_genres: genre,
                    sort_by: sort,
                    page: 1,
                    year: year
                })
                setDiscover(data.results);
                setTotal(data.total_results);

            } catch (error) {
                setError(error.message);
            }
        }

        discover();

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
                    {error ? <p className='error'>{error}</p> :
                        discover.map((el) => (
                            <div className="movies-wrapper">
                                <MovieCard movieobj={el} key={el.id} />
                            </div>
                        ))}

                </div>

            </div>

        </div>
    )
}

export default BigFilter