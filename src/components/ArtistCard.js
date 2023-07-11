import React from 'react'
import { Card, Button, ProgressBar } from 'react-bootstrap'
import { useAlbumCollectionContext } from '../contexts/AlbumCollectionContext';

export default function ArtistCard({ name, artistID, albumCount, onViewAlbumsClick }) {
  const {getAverageRatingForArtist} = useAlbumCollectionContext();
  let albumOrAlbums = albumCount !== 1 ? "albums" : "album";
  const average = getAverageRatingForArtist(artistID).toFixed(2);
  return (
    <>
    <Card style={{
        // background: "rgba(244, 244, 244, .7)"
        background: "rgba(244, 244, 244, .6)"
    }}>
        <Card.Title>
          <div style={{textAlign:"center"}}>
            <h3>{name}</h3>
            {/* <h1 className="fs-5">{genre}</h1> */}
          </div>
        </Card.Title>
        <Card.Body>
        <div style={{textAlign: "center", marginBottom: "15px"}}>
        <Button onClick={onViewAlbumsClick} variant="dark">{albumCount} {albumOrAlbums}</Button>
        </div>
        <ProgressBar 
            className="rounded-pill" 
            variant="info"
            min={0}
            max={10}
            now={average}
            />
            <div style={{textAlign: "center"}}>
              {average}
            </div>
        </Card.Body>
    </Card>
    </>
  )
}
