import { useNavigate } from "react-router-dom";
import React, { FC } from 'react'
import { IArtist } from '@/type';
// import macLogo from '../assets/macLogo.svg'

const ArtistCard: FC<{ artist: IArtist }> = ({ artist: { id, name, image }}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/${id}/${name}/songs`)}>
      <img alt="artist" className="w-full h-56 rounded-lg" src={image} />
      <p className="mt-4 text-lg font-semibold text-white truncate">{name}</p>
    </div>
  );
};

export default ArtistCard;
