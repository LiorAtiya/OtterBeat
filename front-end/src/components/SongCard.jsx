import { useState, useEffect } from 'react'
import loader from '../assets/loader.svg'
import HeartIcon from '../assets/heart.svg'
import OutlineHeartIcon from '../assets/outline-heart.svg'
import PlayIcon from '../assets/play.svg'
import PauseIcon from '../assets/pause.svg'
import axios from "axios";

const SongCard = ({ song }) => {

  const [isFilled, setIsFilled] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('user-info'));

  useEffect(() => {
    const getResult = async () => {
      await axios.get(`http://localhost:3010/api/favorite/specific-song/?userID=${userInfo.id}&songID=${song.id}`)
        .then(response => {
          if (response.data) {
            setIsFilled(response.data.length > 0)
          }
        });
    };
    getResult();
  }, []);

  const addToFavorite = async (id) => {
    await axios.put(`http://localhost:3010/api/favorite/add`, { userID: userInfo.id, songID: id })
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
    await axios.delete(`http://localhost:3010/api/favorite/remove`, { data: { userID: userInfo.id, songID: id } })
      .then(response => {
        setIsFilled(false)
      })
      .catch(error => console.log(error));
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
          isPlay ?
            <img src={PlayIcon} onClick={() => setIsPlay(false)} alt="Play Icon" className="h-16 rounded-sm" />
            :
            <img src={PauseIcon} onClick={() => setIsPlay(true)} alt="Pause Icon" className="h-16 rounded-sm" />
        }
      </div>
      <div className="flex items-center justify-center col-span-1">
        {
          userInfo ?
            <>
              {
                isFilled ?
                  <img src={HeartIcon} onClick={() => removeFromFavorite(song.id)} alt="Heart Icon" className="rounded-sm h-14" />
                  :
                  <img src={OutlineHeartIcon} onClick={() => addToFavorite(song.id)} alt="Heart Icon" className="rounded-sm h-14" />
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
