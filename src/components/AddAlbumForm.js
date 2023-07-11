import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useAlbumCollectionContext } from '../contexts/AlbumCollectionContext';
import { useRef } from 'react';

export default function AddAlbumForm({show, handleClose, defaultArtistID, defaultAlbumID}) {
    

    const nameRef = useRef();
    const genreRef = useRef();
    const artistIDRef = useRef();
    const releaseYearRef = useRef();
    const ratingRef = useRef();
    const {addAlbum, artists} = useAlbumCollectionContext();
    const defaultArtist = artists.filter(artist => artist.ID === defaultArtistID);
    const GENRES = ["Rap", "Trap", "Folk", "Pop", "Rock", "Indie", "Indie Rock", "Indie Pop", "Dream Pop", "Psychedelic", "UBSC",
    "Alternative", "Metal", "Metalcore", "Post-Punk", "Disco"];
    
    function handleSubmit(e) {
        e.preventDefault();
        addAlbum({
            name: nameRef.current.value, 
            genre: genreRef.current.value, 
            releaseYear: parseFloat(releaseYearRef.current.value),
            rating: ratingRef.current.value,
            artistID: artistIDRef.current.value
        })
        handleClose();
    }

  return (
    <Modal show={show}>
        <Form onSubmit={handleSubmit} style={{background: "rgba(183, 203, 224, 0.8)"}}>
            <Modal.Header >
                <Modal.Title>Add Album</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef}></Form.Control>
                </Form.Group>
                <Form.Group controlId="genre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Select ref={genreRef}>
                        <option value="Other">Other</option>
                        {GENRES.map(genre => {
                            return <option value={genre} key={genre}>{genre}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="text" ref={ratingRef}></Form.Control>
                </Form.Group>
                <Form.Group controlId="releaseYear">
                    <Form.Label>Release Year</Form.Label>
                    <Form.Control type="number" ref={releaseYearRef}></Form.Control>
                </Form.Group>
                <Form.Group controlId="artistID">
                    <Form.Label>Artist</Form.Label>
                    <Form.Select ref={artistIDRef}>
                        {defaultArtist != null && (
                        <option value={defaultArtistID} key={defaultArtistID}>{defaultArtist[0]?.name}</option>
                        )}
                        
                        {artists.map(artist => {
                        return (
                            <option key={artist.ID} value={artist.ID}>{artist.name}</option>
                        )
                         })}                        
                    </Form.Select>
                    
                </Form.Group>
                <div className="add-album-form-buttons">
                <Button type="submit" variant="dark">Submit</Button>
                <Button onClick={handleClose} variant="dark">Exit</Button>
                </div>
                
            </Modal.Body>
        </Form>
    </Modal>
  )
}
