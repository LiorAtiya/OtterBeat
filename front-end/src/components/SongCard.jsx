import { useState, useEffect, useRef } from 'react'
import loader from '../assets/loader.svg'
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

import Routes from '../api/routes'

const SongCard = ({ isPlaying, song, onPlay, onStop }) => {

  const audioRef = useRef(new Audio(song.path));

  const [isFilled, setIsFilled] = useState(false);
  // const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      Routes.checkSongFromFavorite(song.id, token)
        .then(response => {
          if (response.data) {
            setIsFilled(response.data.length > 0)
          }
        });
    }

    return () => { handlePause() } //unmount
  }, []);

  const addToFavorite = async (songID) => {

    Routes.addSongToFavorite(songID, token)
      .then(response => {
        if (response.data === 'LIMITED') {
          alert('A regular user has a limit of up to 5 songs in favorite list \nif you want unlimited you will purchase premium')
        } else {
          setIsFilled(true)
        }
      })
      .catch(error => console.log(error));
  }

  const removeFromFavorite = async (songID) => {

    Routes.removeSongFromFavorite(songID, token)
      .then(response => {
        setIsFilled(false)
      })
      .catch(error => console.log(error));
  }

  const handlePlay = () => {
    audioRef.current.play();
    if (onPlay) {
      onPlay(song.id);
    }
  }

  const handlePause = () => {
    audioRef.current.pause();
    if (onStop) {
      onStop();
    }
  }

  return (
    <div className="grid w-full grid-cols-7 gap-4 p-4 mb-4 rounded-lg cursor-pointer bg-white/10 bg-opacity-80 backdrop-blur-sm animate-slideup">

      <div className='col-span-1'>
        <img src={song.images || loader} alt="song_img" className="h-20 rounded-sm" />
      </div>


      <div className="col-span-4">
        <p className="text-lg font-semibold text-white truncate">
          {song.title}
        </p>

        <p className="mt-1 text-sm text-gray-300 truncate">
          Artist: {song.artist_name}
        </p>

        <p className="mt-1 text-sm text-gray-300 truncate">
          Duration: {String(song.duration).length === 1 ?
                      String(song.duration) + ':00' :
                      String(song.duration).length === 3 ?
                        String(song.duration).replace('.', ':') + '0'
                        : String(song.duration).replace('.', ':')}
        </p>

        <p className="mt-1 text-sm text-gray-300 truncate">
          Release: {song.release_year}
        </p>

      </div>

      <div className="flex items-center justify-center col-span-1">
        {
          token ?
            <>
              {
                isFilled ?
                  <AiFillHeart onClick={() => removeFromFavorite(song.id)} alt="Heart Icon" className="w-16 h-16 rounded-sm" color='white' />
                  :
                  <AiOutlineHeart onClick={() => addToFavorite(song.id)} alt="Heart Icon" className="w-16 h-16 rounded-sm" color='white' />
              }
            </>
            :
            null
        }
      </div>

      <div className="flex items-center justify-center col-span-1">
        {
          isPlaying ?
            <FaPause onClick={() => handlePause()} alt="Pause Icon" className="rounded-sm w-14 h-14" color='white' />

            :
            <>
              <FaPlay onClick={() => handlePlay()} alt="Play Icon" className="rounded-sm h-14 w-14" color='white' />
              {
                audioRef.current.pause()
              }
            </>
        }
      </div>

    </div>
  );
};

export default SongCard;
