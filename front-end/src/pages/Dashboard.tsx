import React, { useState, useEffect } from 'react'
import Routes from '../api/routes'
import BarChart from '../components/Chart/BarChart';
import DoughnutChart from '../components/Chart/DoughnutChart';
import LineChart from '../components/Chart/LineChart';
import PieChart from '../components/Chart/PieChart';

export default function Dashboard() {

    const [favorableSongs, setFavorableSongs] = useState([])
    const [favorableArtists, setFavorableArtists] = useState([])
    const [favorableSongsDecade, setFavorableSongsDecade] = useState([])
    const [longestShortestSongs, setLongestShortestSongs] = useState([])

    useEffect(() => {
        const getResult = async () => {
            //Get Top 3 most favorable songs
            Routes.getTop3FavoriteSongs()
                .then(response => setFavorableSongs(response.data))
                .catch(error => console.log(error));

            //Get Top 3 most favorable artists
            Routes.getTop3FavoriteArtists()
                .then(response => setFavorableArtists(response.data))
                .catch(error => console.log(error));

            //Get Top 3 most favorable songs from each decade
            Routes.getTop3Decade()
                .then(response => setFavorableSongsDecade(response.data))
                .catch(error => console.log(error));

            //Get Top 3 longest and shortest songs in the system
            Routes.getShortestAndLongestSongs()
                .then(response => setLongestShortestSongs(response.data))
                .catch(error => console.log(error));
        };
        getResult();
    }, []);

    return (
        <div className='text-white '>
            <h1 className='text-3xl font-bold text-center mb-7 mt-7'>Top Charts of OtterBeat</h1>
            <div className='flex flex-wrap justify-center gap-8 sm:justify-start'>
                <div className='flex flex-col w-full p-4 mx-auto text-center rounded-lg h-52 sm:w-1/2 md:w-2/3 lg:w-2/4 xl:w-2/5 bg-white/5 bg-opacity-80 backdrop-blur-sm md:h-62 lg:h-64 xl:h-80'>
                    <h5 className='font-bold'>Top 3 most favorable songs</h5>
                    {
                        favorableSongs.length !== 0 ?
                            <BarChart data={favorableSongs} />
                            :
                            null
                    }
                </div>
                <div className='flex flex-col items-center justify-center w-full p-4 mx-auto text-center rounded-lg sm:w-1/2 md:w-2/3 lg:w-2/4 xl:w-2/5 bg-white/5 bg-opacity-80 backdrop-blur-sm md:h-72 lg:h-72 xl:h-80'>
                    <h5 className='font-bold'>Top 3 most favorable artists</h5>
                    {
                        favorableArtists.length !== 0 ?
                            <DoughnutChart data={favorableArtists} />
                            :
                            null
                    }
                </div>
            </div>
            <div className='flex flex-wrap justify-center gap-8 sm:justify-start mt-7'>
                <div className='flex flex-col items-center justify-center w-full p-4 mx-auto text-center rounded-lg sm:w-1/2 md:w-2/3 lg:w-2/4 xl:w-2/5 bg-white/5 bg-opacity-80 backdrop-blur-sm md:h-72 lg:h-72 xl:h-80'>
                    <h5 className='font-bold'>Top 3 most favorable songs from each decade</h5>
                    {
                        favorableSongsDecade.length !== 0 ?
                            <PieChart data={favorableSongsDecade} />
                            :
                            null
                    }
                </div>
                <div className='flex flex-col w-full p-4 mx-auto text-center rounded-lg h-52 sm:w-1/2 md:w-2/3 lg:w-2/4 xl:w-2/5 bg-white/5 bg-opacity-80 backdrop-blur-sm md:h-62 lg:h-64 xl:h-80'>
                    <h5 className='font-bold'>Top 3 from shortest to longest songs in the system</h5>
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
