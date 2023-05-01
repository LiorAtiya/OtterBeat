import React, { useState, useEffect } from 'react'
import HeartIcon from '../images/heart.svg'
import OutlineHeartIcon from '../images/outline-heart.svg'
import PlayIcon from '../images/play.svg'
import PauseIcon from '../images/pause.svg'
import axios from "axios";

export default function Song({ song }) {

    const [isFilled, setIsFilled] = useState(false);
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        const getResult = async () => {
            await axios.get(`http://localhost:3010/api/favorite/specific-song/${song.id}`)
                .then(response => {
                    if (response.data){
                        setIsFilled(true)
                    }
                    console.log(response.data)
                });
        };
        getResult();
    }, []);

    const addToFavorite = async (id) => {
        await axios.put(`http://localhost:3010/api/favorite`, { id: id })
            .then(response => {
                setIsFilled(true)
                console.log(response.data)
            })
            .catch(error => console.log(error));
    }

    const removeFromFavorite = async (id) => {
        await axios.delete(`http://localhost:3010/api/favorite`,
            { data: { id: id } })
            .then(response => {
                setIsFilled(false)
                console.log(response.data)
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='song-container'>
            <div className='details-container'>
                ID: {song.id} <br></br>
                Name: {song.title} <br></br>
                Duration: {song.duration}<br></br>
                Release: {song.releaseYear}<br></br>
            </div>
            <div className="play-icon">
                {
                    isPlay ?
                        <img src={PlayIcon} onClick={() => setIsPlay(false)} alt="Heart Icon" className='icon' />
                        :
                        <img src={PauseIcon} onClick={() => setIsPlay(true)} alt="Heart Icon" className='icon' />
                }
            </div>
            <div className="favorite-icon">
                {
                    isFilled ?
                        <img src={HeartIcon} onClick={() => removeFromFavorite(song.id)} alt="Heart Icon" className='icon' />
                        :
                        <img src={OutlineHeartIcon} onClick={() => addToFavorite(song.id)} alt="Heart Icon" className='icon' />
                }

            </div>
        </div>
    )
}
