import React from 'react'
import { useParams } from 'react-router';
import Genres from '../components/Genreslist';
import MoviesGrid from '../components/MoviesGrid';

const Catalog = () => {


    const { genreid } = useParams();

    return (
        <div className='catalog'>
            <Genres />
            <MoviesGrid genre={genreid} />
        </div>
    )
}

export default Catalog
