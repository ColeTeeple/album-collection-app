import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useAlbumCollectionContext } from '../contexts/AlbumCollectionContext';
import { useRef } from 'react';

export default function AddArtistForm({show, handleClose}) {
    const nameRef = useRef();
    const genreRef = useRef();
    const albumCountRef = useRef();
    const {addArtist} = useAlbumCollectionContext();

    function handleSubmit(e) {
        e.preventDefault();
        addArtist({
            name: nameRef.current.value, 
        })
        handleClose();
    }

  return (
    <Modal show={show}>
        <Form onSubmit={handleSubmit} style={{background: "rgba(183, 203, 224, 0.8)"}}>
            <Modal.Header>
                <Modal.Title>Add Artist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef}></Form.Control>
                </Form.Group>
                
                <Button type="submit">Submit</Button>
                <Button onClick={handleClose}>Exit</Button>
                
            </Modal.Body>
        </Form>
    </Modal>
  )
}
