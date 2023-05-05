import React, {useState, useEffect} from 'react'
import axios from "axios";
import headerImage from '../images/header-pic.png';
import FavoriteList from '../components/FavoriteList'
import SearchBox from '../components/SearchBox'
import ArtistsList from '../components/ArtistsList'
import { Link } from 'react-router-dom';

export default function Home() {

    const [data, setData] = useState([])

    useEffect(() => {
        const getResult = async () => {
            //Get all song
            await axios.get(`http://localhost:3010/api/songs/get-artists`)
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

    const filteredData = data.filter(artist => {
        return artist.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    return (
        <div className='app-container'>
            <Link to="/dashboard"><button>Dashboard</button></Link>
            <img className='header-image' src={headerImage} alt="header Image" />
            <FavoriteList />
            <SearchBox searchChange={onSearchChange} />
            <ArtistsList artists={filteredData} />
        </div>
    )
}
