import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Song from './Song';
import axios from "axios";

const SongsList = ({ album }) => {

    // const [favorite, setFavorite] = useState([])

    // useEffect(() => {
    //     const getResult = async () => {
    //         //Get all song
    //         await axios.get(`http://localhost:3010/api/favorite`)
    //             .then(response => {
    //                 setFavorite(response.data)
    //                 console.log(response.data)
    //             });
    //     };
    //     getResult();
    // }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='songs-list-container'>

            <div onClick={handleShow} className='tc bg-black dib br3 pa3 ma3 grow bw2 shadow-5'>
                {/* <div className='img-center'>
                                        <img alt='robots' src={robot.image} className="h5" />
                    </div> */}
                <div>
                    <h2>{album.artist}</h2>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <h5><b>Artist's Songs</b></h5>
                </Modal.Header>
                <Modal.Body>
                    {
                        album.songs.map((song, i) => {
                            return (
                                <Song key={i} song={song}/>
                            )
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SongsList;