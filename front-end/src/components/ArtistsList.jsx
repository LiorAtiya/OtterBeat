import React from 'react';
import '../styles/Songs.css'
import SongsList from './SongsList';

const ArtistsList = ({ albums }) => {
    return (
        <>
            {
                <div className='artists-list-container' key={1}>
                    {
                        albums.map((album, i) => {
                            return (
                                <SongsList key={i} album={album} />
                            )
                        })
                    }
                </div>
            }
        </>
    )
}

export default ArtistsList;