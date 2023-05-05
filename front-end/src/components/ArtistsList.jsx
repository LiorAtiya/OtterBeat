import React from 'react';
import '../styles/Songs.css'
import SongsList from './SongsList';

const ArtistsList = ({ artists }) => {
    return (
        <>
            {
                <div className='artists-list-container' key={1}>
                    {
                        artists.map((artist, i) => {
                            return (
                                <SongsList key={i} artist={artist} />
                            )
                        })
                    }
                </div>
            }
        </>
    )
}

export default ArtistsList;