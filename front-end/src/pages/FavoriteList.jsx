import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import { SongCard } from '../components';
import { Searchbar } from '../components';

export default function FavoriteList() {

    const { id } = useParams();
    const [data, setData] = useState([])

    useEffect(() => {
        const getResult = async () => {
            //Get all song
            await axios.get(`http://localhost:3010/api/favorite/all-song/${id}`)
                .then(response => {
                    setData(response.data)
                });
        };
        getResult();
    }, []);

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const [searchfield, setSearchfield] = useState("");

    const filteredData = data?.filter(song => {
        return song.title.toLowerCase().includes(searchfield.toLowerCase());
    })

    return (
        <div>
            <Searchbar searchChange={onSearchChange} name={'song'}/>

            <h2 className="mb-4 text-3xl font-bold text-left text-white">My Favorite Songs</h2>
            {
                filteredData?.map((song, i) => {
                    return <SongCard key={i} song={song} />
                })
            }
        </div>
    )
}
