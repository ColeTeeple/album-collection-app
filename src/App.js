import React from "react";
import { useState } from "react";
import ArtistCard from "./components/ArtistCard";
import { useAlbumCollectionContext } from "./contexts/AlbumCollectionContext";
import { Stack, Button } from "react-bootstrap";
import AddArtistForm from "./components/AddArtistForm";
import ViewAlbumsModal from "./components/ViewAlbumsModal";
import AddAlbumForm from "./components/AddAlbumForm";
import ViewInfoModal from "./components/ViewInfoModal";
import AreYouSureModal from "./components/AreYouSureModal";
import EditAlbumForm from "./components/EditAlbumForm";

function App() {
  const [showAddArtistForm, setShowAddArtistForm] = useState(false);
  const {artists, setArtists, albums, getAlbumsForArtist, getAverageRatingForArtist} = useAlbumCollectionContext();
  const [showAddAlbumForm, setShowAddAlbumForm] = useState(false);
  const [showEditAlbumForm, setShowEditAlbumForm] = useState(false);
  const [showViewInfoModal, setShowViewInfoModal] = useState(false);
  const [viewAlbumsModalArtistID, setViewAlbumsModalArtistID] = useState();
  const [showViewAlbumsModal, setShowViewAlbumsModal] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const newArr = [...artists];

  function sortArtistsByRating() {
    newArr.sort((a, b) => {
      const avgRatingA = getAverageRatingForArtist(a.ID);
      const avgRatingB = getAverageRatingForArtist(b.ID);
      return avgRatingB - avgRatingA;
    });
    setArtists(newArr);
  }

  function sortArtistsAlphabetically() {
    const newArr = [...artists];
    newArr.sort((a, b) => (a.name > b.name) ? 1 : -1);
    setArtists(newArr);
    console.log(artists);
    console.log(albums);
  }

  function clearLocalStorage() {
    localStorage.clear();
    window.location.reload();
  }

  function onViewAlbumsClick(artistID) {
    setViewAlbumsModalArtistID(artistID);
    setShowViewAlbumsModal(true);
  }

  return (
    <>
    
    
      <div style={{textAlign: "center", marginBottom: "20px"}}>
        <h1 className="me-auto" style={{color: "white"}}>Album Collection</h1>
      </div>
      <div className="add-buttons">
        <Button onClick={() => setShowAddArtistForm(true)} variant="dark">Add Artist</Button>
        <Button onClick={() => setShowAddAlbumForm(true)} variant="dark">Add Album</Button>
      </div>
      <div className="edit-and-info-buttons">
        <Button onClick={() => setShowViewInfoModal(true)} variant="dark" id="view-info-button">View Info</Button>
        <Button onClick={() => setShowEditAlbumForm(true)} variant="dark" id="edit-album-button">Edit Album</Button>
      </div>
      <div className="sort-buttons">
        <Button onClick={sortArtistsByRating} variant="dark">Sort (Rating)</Button>
        <Button onClick={sortArtistsAlphabetically} variant="dark">Sort (A-Z)</Button>
      </div>

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1rem"
    }}>
    {artists.map(artist => {
      let albums = getAlbumsForArtist(artist.ID);
      return (
        <ArtistCard name={artist.name} artistID={artist.ID} albumCount={albums.length} onViewAlbumsClick={() => onViewAlbumsClick(artist.ID)} />
      )
    })}

    </div>
    <div style={{textAlign: "center"}}>
    <Button onClick={() => setShowAreYouSureModal(true)} style={{marginTop: "25px"}} variant="dark">Clear Storage</Button>
    </div>
    <AddArtistForm show={showAddArtistForm} handleClose={() => setShowAddArtistForm(false)} />
    <ViewInfoModal show={showViewInfoModal} handleClose={() => setShowViewInfoModal(false)} />
    <ViewAlbumsModal show={showViewAlbumsModal} artistID={viewAlbumsModalArtistID} handleClose={() => setShowViewAlbumsModal(false)} onAddAlbumClick={() => setShowAddAlbumForm(true)} />
    <AddAlbumForm show={showAddAlbumForm} handleClose={() => setShowAddAlbumForm(false)} defaultArtistID={viewAlbumsModalArtistID} />
    <EditAlbumForm show={showEditAlbumForm} handleClose={() => setShowEditAlbumForm(false)} />
    <AreYouSureModal show={showAreYouSureModal} handleClose={() => setShowAreYouSureModal(false)} clearLocalStorage={clearLocalStorage} />
    </>
  );
}

export default App;
