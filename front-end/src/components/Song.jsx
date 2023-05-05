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
            await axios.get(`http://localhost:3010/api/favorite/specific-song/?userID=${1}&songID=${song.id}`)
                .then(response => {
                    if (response.data) {
                        setIsFilled(response.data.length > 0)
                    }
                });
        };
        getResult();
    }, []);

    const addToFavorite = async (id) => {
        await axios.put(`http://localhost:3010/api/favorite/add`, { userID: 1, songID: id })
            .then(response => {
                setIsFilled(true)
            })
            .catch(error => console.log(error));
    }

    const removeFromFavorite = async (id) => {
        await axios.delete(`http://localhost:3010/api/favorite/remove`,
            { data: { userID: 1, songID: id } })
            .then(response => {
                setIsFilled(false)
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='song-container'>
            <div className='details-container'>
                ID: {song.id} <br></br>
                Name: {song.title} <br></br>
                Duration: {song.duration}<br></br>
                Release: {song.release_year}<br></br>
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
