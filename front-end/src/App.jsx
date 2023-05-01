import { useState, useEffect } from 'react'
import './App.css'
import SearchBox from './components/SearchBox'
import AlbumList from './components/ArtistsList'
import headerImage from './images/header-pic.png';
import 'bootstrap/dist/css/bootstrap.css';
import FavoriteList from './components/FavoriteList'
import axios from "axios";

function App() {

  const [data,setData] = useState([])

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

export default App
