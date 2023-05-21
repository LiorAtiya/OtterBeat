import { useState, useEffect, useRef } from 'react'
import loader from '../assets/loader.svg'
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

import Routes from '../api/routes'

import ScienceVisions from '../assets/songs/CHVRCHES - Science Visions.mp3'
import TheMotherWeShare from '../assets/songs/CHVRCHES - The Mother We Share.mp3'
import WeSink from '../assets/songs/CHVRCHES - We Sink.mp3'
import BuddyHolly from '../assets/songs/Weezer - Buddy Holly.mp3'
import DontLetGo from '../assets/songs/Weezer - Don\'t Let Go.mp3'
import BeverlyHills from '../assets/songs/Weezer - Beverly Hills.mp3'
import LosingMyReligion from '../assets/songs/R.E.M. - Losing my religion.mp3'
import EverybodyHurts from '../assets/songs/R.E.M. - Everybody Hurts.mp3'
import OrangeCrushwith from '../assets/songs/R.E.M. - Orange Crush with.mp3'

const SongCard = ({ isPlaying, song, onPlay, onStop }) => {

  const audioRef = useRef(new Audio(
    song.id === 1 ?
      ScienceVisions
      :
      song.id === 2 ?
        TheMotherWeShare
        :
        song.id === 3 ?
          WeSink
          :
          song.id === 4 ?
            BuddyHolly
            :
            song.id === 5 ?
              DontLetGo
              :
              song.id === 6 ?
                BeverlyHills
                :
                song.id === 7 ?
                  LosingMyReligion
                  :
                  song.id === 8 ?
                    EverybodyHurts
                    :
                    OrangeCrushwith

  ));

  const [isFilled, setIsFilled] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('user-info'));

  useEffect(() => {
    if (userInfo) {
      Routes.checkSongFromFavorite(userInfo.id, song.id)
        .then(response => {
          if (response.data) {
            setIsFilled(response.data.length > 0)
          }
        });
    }

    console.log(isPlaying, onPlay, onStop, song)
    return () => { handlePause() } //unmount
  }, []);

  const addToFavorite = async (id) => {

    Routes.addSongToFavorite(userInfo.id, id)
      .then(response => {
        if (response.data === 'LIMITED') {
          alert('A regular user has a limit of up to 5 songs in favorite list \nif you want unlimited you will purchase premium')
        } else {
          setIsFilled(true)
        }
      })
      .catch(error => console.log(error));
  }

  const removeFromFavorite = async (id) => {

    Routes.removeSongFromFavorite(userInfo.id, id)
      .then(response => {
        setIsFilled(false)
      })
      .catch(error => console.log(error));
  }

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlay(true)
    if (onPlay) {
      onPlay(song.id);
    }
  }

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlay(false)
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
          Duration: {String(song.duration).replace('.', ':')}
        </p>

        <p className="mt-1 text-sm text-gray-300 truncate">
          Release: {song.release_year}
        </p>
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
      <div className="flex items-center justify-center col-span-1">
        {
          userInfo ?
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
    </div>
  );
};

export default SongCard;
