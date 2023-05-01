// import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "../styles/SearchBox.css"

const SearchBox = ({ searchChange }) => {
    return (
        <>
            <div className='input-container'>
                <input
                    className="search-input"
                    type="text"
                    id="search"
                    placeholder='Quick search character'
                    onChange={searchChange}
                />
                <FontAwesomeIcon className='search-btn' icon={faMagnifyingGlass} color="#bada55"/>
            </div>
        </>
    )
}

export default SearchBox; 