import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Song from './Song';

export default function FavoriteList() {

    const [data, setData] = useState([])

    useEffect(() => {
        const getResult = async () => {
            //Get all song
            await axios.get(`http://localhost:3010/api/favorite/all-song/${1}`)
                .then(response => {
                    setData(response.data)
                });
        };
        getResult();
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className='favorite-list-container'>

                <div onClick={handleShow} className='tc bg-black dib br3 pa3 ma3 grow bw2 shadow-5 white'>
                    <h2>Favorite Songs ❤</h2>
                </div>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <h5><b>Favorite Songs ❤</b></h5>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            data.map((song, i) => {
                                return (
                                    <Song key={i} song={song} />
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
        </div>
    )
}
