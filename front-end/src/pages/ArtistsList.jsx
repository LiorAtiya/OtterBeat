import { ArtistCard, Loader } from "../components";
import React, { useState, useEffect } from 'react'
import { Searchbar } from '../components';
import Routes from "../api/routes";
import Weezer from '../assets/images/artists/Weezer.jpg'
import REM from '../assets/images/artists/R.E.M.jpg'
import CHVRCHES from '../assets/images/artists/CHVRCHES.jpeg'

const ArtistsList = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    const getResult = async () => {
      //Get all song
      Routes.getAllArtists()
        .then(response => {

          const copyArray = [...response.data]
          copyArray[0].image = CHVRCHES
          copyArray[1].image = Weezer
          copyArray[2].image = REM

          setData(copyArray)
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
      <Searchbar searchChange={onSearchChange} name="artist" />

      <h2 className="mb-4 text-3xl font-bold text-left text-white">Artists</h2>

      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        {
          filteredData?
            filteredData.map((artist, i) => {
              return <ArtistCard key={i} artist={artist} />
            })
            :
            <Loader />
        }
      </div>
    </div>
  );
};

export default ArtistsList;
