import React from 'react'

const BigFilter = () => {
    return (

        <form>
            <div className='filter-big'>

                <div className='filter-left-blog'>
                    <label className='movie-filterName' >Sort_by</label>
                    <select>
                        <option>Title</option>
                        <option>Popularity</option>
                        <option>Date_release</option>
                        <option>Vote_average</option>
                        <option>Vote_count</option>
                    </select>
                </div>

                <div className='filter-right-blog'>
                    <label className='movie-filterName' for='movie-name'>Movie Name</label>
                    <input id='movie-name' />
                    <label className='movie-filterName' >Year</label>
                    <select>
                        <option>All</option>
                        <option>1960</option>
                        <option>1961</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                    </select>
                    <label className='movie-filterName' >Country</label>
                    <select>
                        <option>All</option>
                        <option>Search</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                    </select>

                    <label className='movie-filterName' >Genres</label>
                    <input placeholder='comedy,triller,....' />
   <hr />
            <div className='filter-bottom-blog'>
                <button>Search</button>
                <span>Found:   </span><span>...</span><span>   movies</span>
            </div>
                </div>
             
            </div>
            

        </form>


    )
}

export default BigFilter