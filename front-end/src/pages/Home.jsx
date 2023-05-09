import React, { useState, useEffect } from 'react'
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

    async function handleInfo() {
        const options = {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJuYW1lIjoidGVzdHQiLCJlbWFpbCI6InRlc3R0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJG16UjZNT0t4eHZFOWpyRlJGRXlyU2VnR3JJbFoxNFVzd3hIek9jQnVkZVBmdk95ZzZJQzM2IiwiaXNfcHJlbWl1bSI6ZmFsc2V9LCJpYXQiOjE2ODM2Njc0MzV9.28g2i0S_YuqTchTy4GfdHZ3ir2CzJqtqm8Kz9TjjYBM'
            }
        };

        await axios.get(`http://localhost:3010/api/auth/info-user`, options)
            .then(response => {
                console.log(response.data)
            });
    }

    async function handleLogin() {

        await axios.post(`http://localhost:3010/api/auth/login`, { email: 'testt@gmail.com', password: 12345 })
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }

    async function handleRegister() {

        await axios.post(`http://localhost:3010/api/auth/register`, { name: 'testt', email: 'testt@gmail.com', is_premium: false, password: 12345 })
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }

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
            <button onClick={() => handleInfo()}>Get Info user</button>
            <button onClick={() => handleLogin()}>Login</button>
            <button onClick={() => handleRegister()}>Register</button>
            <img className='header-image' src={headerImage} alt="header Image" />
            <FavoriteList />
            <SearchBox searchChange={onSearchChange} />
            <ArtistsList artists={filteredData} />
        </div>
    )
}
