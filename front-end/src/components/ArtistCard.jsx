import { useNavigate } from "react-router-dom";
import React from 'react'
import macLogo from '../assets/macLogo.svg'

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" 
          onClick={() => navigate(`/${artist.id}/${artist.name}/songs`)}>
      <img alt="artist" className="w-full h-56 rounded-lg" src={macLogo} />
      <p className="mt-4 text-lg font-semibold text-white truncate">{artist.name}</p>
    </div>
  );
};

export default ArtistCard;
