import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Routes from '../api/routes'
import { SongCard } from '../components';
import { Searchbar } from '../components';

export default function FavoriteList() {

    const { id } = useParams();
    const [data, setData] = useState([])

    useEffect(() => {
        const getResult = async () => {
            //Get favorite songs of user
            Routes.getFavoriteListOfUser(id)
                .then(response => {
                    setData(response.data)
                })
                .catch(error => console.log(error));
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
            <Searchbar searchChange={onSearchChange} name={'song'} />

            <h2 className="mb-4 text-3xl font-bold text-left text-white">My Favorite Songs</h2>
            {
                filteredData?.map((song, i) => {
                    return <SongCard key={i} song={song} />
                })
            }
        </div>
    )
}
