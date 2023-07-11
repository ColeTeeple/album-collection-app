import React from 'react'
import { Modal, Button, Stack } from 'react-bootstrap'
import { useAlbumCollectionContext } from '../contexts/AlbumCollectionContext'

export default function ViewAlbumsModal({ show, artistID, handleClose, onAddAlbumClick }) {
    const {getAlbumsForArtist, artists, deleteAlbum, getAverageRatingForArtist, defaultAlbumID, setDefaultAlbumID, setShowAddAlbumForm} = useAlbumCollectionContext();
    let albums = getAlbumsForArtist(artistID).sort((a, b) => (a.releaseYear > b.releaseYear) ? 1 : -1);
    const artist = artists.find(artist => artist.ID === artistID);
    const average = getAverageRatingForArtist(artistID).toFixed(2);
    const defaultID = defaultAlbumID;

  return (
    <Modal show={show} style={{background: "rgba(244, 244, 244, .7)"}}>
        <Modal.Header style={{background: "rgba(183, 203, 224, 0.8)"}}>
            <Modal.Title> Albums By {artist?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background: "rgba(183, 203, 224, 0.8)"}}>
            {albums.map(album => {
                return (
                    <>
                    <Stack direction="horizontal" gap="3">
                    <h5 style={{textAlign: "center"}} className="me-auto">{album.name} ({album.releaseYear})</h5>
                    <h5>{album.rating}/10</h5>
                    <Button onClick={() => deleteAlbum(album.ID)} size="sm" variant="danger">&times;</Button>
                    </Stack>
                    </>
                )
            })}
                    <h6 style={{textAlign: "center"}}>Average Rating: {average}</h6>

            <div className="view-albums-modal-buttons">
            <Button onClick={onAddAlbumClick} variant="dark">Add Album</Button>
            <Button onClick={handleClose} variant="dark">Exit</Button>
            </div>
        </Modal.Body>
    </Modal>
  )
}
