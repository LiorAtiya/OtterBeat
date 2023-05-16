import React, { useState, useEffect } from 'react'

import BarChart from '../components/Chart/BarChart';
import DoughnutChart from '../components/Chart/DoughnutChart';
import LineChart from '../components/Chart/LineChart';
import PieChart from '../components/Chart/PieChart';
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
        <div className='text-white '>
            <h1 className='text-3xl font-bold text-center mb-7 mt-7'>Top Charts of OtterBeat</h1>
            <div className='flex items-center justify-center mx-auto text-center mb-7'>
                <div className='font-bold' style={{ width: 700 }}>
                    <h5>Top 3 most favorable songs</h5>
                    {
                        favorableSongs.length !== 0 ?
                            <BarChart data={favorableSongs} />
                            :
                            null
                    }
                </div>
                <div className='font-bold' style={{ width: 340 }}>
                    <h5>Top 3 most favorable artists</h5>
                    <DoughnutChart data={favorableArtists} />
                </div>
            </div>
            <div className='flex items-center justify-center mx-auto text-center'>
                <div className='font-bold' style={{ width: 350 }}>
                    <h5>Top 3 most favorable songs from each decade</h5>
                    <PieChart data={favorableSongsDecade} />
                </div>
                <div className='font-bold' style={{ width: 700 }}>
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
