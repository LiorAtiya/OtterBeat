import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Routes from '../api/routes'
import { SongCard, Searchbar } from '../components';

const SongsList = () => {

    const { name, id } = useParams();
    const [songsOfArtist, setSongsOfArtist] = useState([])

    useEffect(() => {
        const getResult = async () => {
            //Get all songs of specific atrist
            Routes.getSongsOfArtist(id)
                .then(response => {
                    setSongsOfArtist(response.data)
                })
                .catch(error => console.log(error));
        };
        getResult();
    }, []);

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const [searchfield, setSearchfield] = useState("");

    const filteredData = songsOfArtist?.filter(song => {
        return song.title.toLowerCase().includes(searchfield.toLowerCase());
    })

    return (
        <>
            <Searchbar searchChange={onSearchChange} name={'song'} />

            <h2 className="mb-4 text-3xl font-bold text-left text-white">Songs Of {name}</h2>
            {
                filteredData?.map((song, i) => {
                    return <SongCard key={i} song={song} />
                })
            }
        </>
    );
}

export default SongsList;