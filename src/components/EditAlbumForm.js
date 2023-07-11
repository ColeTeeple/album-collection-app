import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useAlbumCollectionContext } from '../contexts/AlbumCollectionContext';
import { useRef } from 'react';

export default function EditAlbumForm({show, handleClose }) {
    const GENRES = ["Rap", "Trap", "Folk", "Pop", "Rock", "Indie", "Indie Rock", "Indie Pop", "Dream Pop", "Psychedelic", "UBSC",
    "Alternative", "Metal", "Metalcore", "Post-Punk", "Disco"];
    
    const artistIDRef = useRef();
    const albumNameRef = useRef();
    const genreRef = useRef();
    const ratingRef = useRef();
    const releaseYearRef = useRef();

    const {editAlbum, artists, albums, getAlbumsForArtist} = useAlbumCollectionContext();
    let artistID = "";

    function updateFunction() {
        artistID = artistIDRef.current.value;
    }
    function handleSubmit(e) {
        e.preventDefault();
        const albumID = albums.find(album => album.name === albumNameRef.current.value).ID;
        editAlbum(albumID, {
            name: albumNameRef.current.value, 
            genre: genreRef.current.value, 
            rating: ratingRef.current.value,
            releaseYear: parseFloat(releaseYearRef.current.value),
            artistID: artistIDRef.current.value
        })
        console.log(albums);
        handleClose();
    }

  return (
    <Modal show={show}>
        <Form onSubmit={handleSubmit} style={{background: "rgba(183, 203, 224, 0.8)"}}>
            <Modal.Header >
                <Modal.Title>Edit Album</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form.Group controlId="artist">
                    <Form.Label>Artist</Form.Label>
                    <Form.Select type="text" ref={artistIDRef}>
                    {artists.map(artist => {
                        return <option value={artist.ID} key={artist.ID}>{artist.name}</option>
                    })}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="album">
                    <Form.Label>Album</Form.Label>
                    <Form.Select onChange={updateFunction} ref={albumNameRef}>
                    {albums.map(album => {
                        return <option value={album.name} key={album.ID}>{album.name}</option>
                    })}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="genre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Select ref={genreRef}>
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
                
                
                <Button type="submit">Submit</Button>
                <Button onClick={handleClose}>Exit</Button>
                
            </Modal.Body>
        </Form>
    </Modal>
  )
}
