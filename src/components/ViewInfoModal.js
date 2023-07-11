import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useAlbumCollectionContext } from '../contexts/AlbumCollectionContext';

export default function ViewInfoModal({ show, handleClose }) {

  const { artists, albums, getAlbumsForArtist, getTotalAlbumCount, getAverageRating, getMostListenedGenre, getHighestRatedArtist } = useAlbumCollectionContext();
  const albumTotal = getTotalAlbumCount(artists);
  const averageRating = getAverageRating(albums, albumTotal);
  const mostListenedToGenre = getMostListenedGenre(albums);
  const highestRatedArtist = getHighestRatedArtist(artists);
  return (
    <Modal show={show}>
        <Modal.Header style={{background: "rgba(183, 203, 224, 0.8)"}}>
            <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background: "rgba(183, 203, 224, 0.8)"}}>
            <p>Total Albums: {albumTotal}</p>
            <p>Average Rating: {averageRating.toFixed(2)}</p>
            <p>Most Listened To Genre: {mostListenedToGenre}</p>
            <p>Highest Rated Artist: {highestRatedArtist}</p>
            <Button onClick={handleClose}>Exit</Button>
        </Modal.Body>
    </Modal>
  );
}
