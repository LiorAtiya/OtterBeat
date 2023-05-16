import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { SongCard, Searchbar } from '../components';

const SongsList = () => {

    const { name, id } = useParams();
    const [songsOfArtist, setSongsOfArtist] = useState([])

    useEffect(() => {
        const getResult = async () => {
            //Get all songs of specific atrist
            await axios.get(`http://localhost:3010/api/songs/get-songs-of-artist/${id}`)
                .then(response => {
                    setSongsOfArtist(response.data)
                });
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
            
            <h2 className="mb-4 text-3xl font-bold text-left text-white">{name}</h2>
            {
                filteredData    ?.map((song, i) => {
                    return <SongCard key={i} song={song} />
                })
            }
        </>
    );
}

export default SongsList;