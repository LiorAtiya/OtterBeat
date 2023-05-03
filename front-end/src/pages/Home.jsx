import React, {useState, useEffect} from 'react'
import axios from "axios";
import headerImage from '../images/header-pic.png';
import FavoriteList from '../components/FavoriteList'
import SearchBox from '../components/SearchBox'
import AlbumList from '../components/ArtistsList'

export default function Home() {

    const [data, setData] = useState([])

    useEffect(() => {
        const getResult = async () => {
            //Get all song
            await axios.get(`http://localhost:3010/api/songs`)
                .then(response => setData(response.data));
        };
        getResult();
    }, []);

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const [searchfield, setSearchfield] = useState("");

    const filteredData = data.filter(album => {
        return album.artist.toLowerCase().includes(searchfield.toLowerCase());
    })

    return (
        <div className='app-container'>
            <img className='header-image' src={headerImage} alt="header Image" />
            <FavoriteList />
            <SearchBox searchChange={onSearchChange} />
            <AlbumList albums={filteredData} />
        </div>
    )
}
