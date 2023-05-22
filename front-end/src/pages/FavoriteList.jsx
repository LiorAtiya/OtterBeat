import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Routes from '../api/routes'
import { Loader, SongCard } from '../components';
import { Searchbar } from '../components';

export default function FavoriteList() {

    const [data, setData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const getResult = async () => {
            //Get favorite songs of user
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/')
            } else {
                Routes.getFavoriteListOfUser(token)
                    .then(response => {
                        setData(response.data)
                    })
                    .catch(error => console.log(error));
            }

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

    const [currentSongId, setCurrentSongId] = useState(-1);

    const handleSongPlay = (songId) => {
        setCurrentSongId(songId);
    };

    const handleSongStop = () => {
        setCurrentSongId(null);
    };

    return (
        <div>
            <Searchbar searchChange={onSearchChange} name={'song'} />

            <h2 className="mb-4 text-3xl font-bold text-left text-white">My Favorite Songs</h2>
            {
                filteredData ?
                    filteredData.map((song, i) => {
                        return <SongCard key={i}
                            song={song}
                            isPlaying={currentSongId === song.id}
                            onPlay={handleSongPlay}
                            onStop={handleSongStop}
                        />
                    })
                    :
                    <Loader />
            }
        </div>
    )
}
