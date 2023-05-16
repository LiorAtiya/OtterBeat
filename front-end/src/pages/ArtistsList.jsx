import { ArtistCard } from "../components";

import React, { useState, useEffect } from 'react'
import { Searchbar } from '../components';
import axios from "axios";

const ArtistsList = () => {

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

    <div className="flex flex-col">
      <Searchbar searchChange={onSearchChange} name="artist"/>

      <h2 className="mb-4 text-3xl font-bold text-left text-white">Artists</h2>

      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        {
          filteredData?.map((artist, i) => {
            return <ArtistCard key={i} artist={artist} />
          })
        }
      </div>
    </div>
  );
};

export default ArtistsList;
