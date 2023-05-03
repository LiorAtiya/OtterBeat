import React, { useState, useEffect } from 'react'
import '../styles/Dashboard.css'

import BarChart from '../components/BarChart';
import DoughnutChart from '../components/DoughnutChart';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import axios from "axios";

export default function Dashboard() {

    const [favorableSongs, setFavorableSongs] = useState([])
    const [favorableArtists, setFavorableArtists] = useState([])
    const [favorableSongsDecade, setFavorableSongsDecade] = useState([])
    const [longestShortestSongs, setLongestShortestSongs] = useState([])

    useEffect(() => {
        const getResult = async () => {
            //Get Top 3 most favorable songs
            await axios.get(`http://localhost:3010/api/management/favorable-songs`)
                .then(response => setFavorableSongs(response.data));

            //Get Top 3 most favorable artists
            await axios.get(`http://localhost:3010/api/management/favorable-artists`)
                .then(response => setFavorableArtists(response.data));

            //Get Top 3 most favorable songs from each decade
            await axios.get(`http://localhost:3010/api/management/favorable-songs-decade`)
                .then(response => setFavorableSongsDecade(response.data));

            //Get Top 3 longest and shortest songs in the system
            await axios.get(`http://localhost:3010/api/management/longest-shortest-songs`)
                .then(response => setLongestShortestSongs(response.data));
        };
        getResult();
    }, []);

    return (
        <div className='dashboard-container'>
            <h1>OtterBeat’s management</h1>
            <div className='line-1'>
                <div className='favorite-songs' style={{ width: 700 }}>
                    <h5>Top 3 most favorable songs</h5>
                    <BarChart data={favorableSongs} />
                </div>
                <div className='favorite-artists' style={{ width: 340 }}>
                    <h5>Top 3 most favorable artists</h5>
                    <DoughnutChart data={favorableArtists} />
                </div>
            </div>
            <div className='line-2'>
                <div className='favorable-decade' style={{ width: 350 }}>
                    <h5>Top 3 most favorable songs from each decade</h5>
                    <PieChart data={favorableSongsDecade} />
                </div>
                <div className='longest-songs' style={{ width: 700 }}>
                    <h5>Top 3 from shortest to longest songs in the system</h5>
                    {
                        longestShortestSongs.length !== 0 ?
                            <LineChart data={longestShortestSongs} />
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
}
