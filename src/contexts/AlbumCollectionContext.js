import React from "react";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

export const AlbumCollectionContext = React.createContext();

export function useAlbumCollectionContext() {
  return useContext(AlbumCollectionContext);
}

export const AlbumCollectionContextProvider = ({ children }) => {
  const [artists, setArtists] = useLocalStorage("artists", []); //ID, name, genre, albums
  const [albums, setAlbums] = useLocalStorage("albums", []); //ID, name, genre, artistID
  const [defaultAlbumID, setDefaultAlbumID] = useState();
  const [showAddAlbumForm, setShowAddAlbumForm] = useState(false);

  function addArtist({ name }) {
    setArtists((prevArtists) => {
      if (prevArtists.find((artist) => artist.name === name)) {
        return prevArtists;
      }
      const newArr = [...prevArtists, { ID: uuidv4(), name }].sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      return newArr;
    });
  }

  function addAlbum({ name, genre, rating, releaseYear, artistID }) {
    setAlbums((prevAlbums) => {
      return [
        ...prevAlbums,
        { ID: uuidv4(), name, genre, rating, releaseYear, artistID },
      ];
    });
  }

  function editAlbum(albumID, newAlbum) {
    let newArr = [...albums];
    const index = newArr.findIndex((album) => album.ID === albumID);
    newArr[index] = newAlbum;
    setAlbums(newArr);
  }

  function getAlbumsForArtist(artistID) {
    return albums.filter((album) => album.artistID === artistID);
  }

  function deleteAlbum(albumID) {
    setAlbums((prevAlbums) => {
      return prevAlbums.filter((album) => album.ID !== albumID);
    });
  }

  function getTotalAlbumCount(artists) {
    let albumTotal = 0;
    artists.forEach((artist) => {
      albumTotal += getAlbumsForArtist(artist.ID).length;
    });
    return albumTotal;
  }

  function getAverageRating(albums, albumTotal) {
    const totalRating = albums.reduce(
      (total, album) => total + parseFloat(album.rating),
      0
    );
    return totalRating / albumTotal;
  }

  function getMostListenedGenre(albums) {
    const genres = [];

    albums.forEach((album) => {
      genres.push(album.genre);
    });

    let count = {};
    for (let i = 0; i < genres.length; i++) {
      if (count[genres[i]] === undefined) {
        count[genres[i]] = 1;
      } else {
        count[genres[i]]++;
      }
    }
    let highestCount = null;
    let mostCommonElement = null;
    for (let element in count) {
      if (count[element] > highestCount) {
        highestCount = count[element];
        mostCommonElement = element;
      }
    }
    return mostCommonElement;
  }

  function getAverageRatingForArtist(artistID) {
    let albums = getAlbumsForArtist(artistID);
    let totalRating = 0;
    albums.forEach((album) => {
      totalRating += parseFloat(album.rating);
    });
    return totalRating / albums.length;
  }

  function getHighestRatedArtist(artists) {
    let averageRatings = [];
    let highestAverage = null;
    let highestScoringArtist = null;
    for (let i = 0; i < artists.length; i++) {
      averageRatings.push(getAverageRatingForArtist(artists[i].ID));
      if (averageRatings[i] > highestAverage) {
        highestAverage = averageRatings[i];
        highestScoringArtist = artists[i].name;
      }
    }
    return highestScoringArtist;
  }

  return (
    <AlbumCollectionContext.Provider
      value={{
        artists,
        setArtists,
        albums,
        setAlbums,
        defaultAlbumID,
        setDefaultAlbumID,
        addArtist,
        addAlbum,
        getAlbumsForArtist,
        deleteAlbum,
        getTotalAlbumCount,
        getAverageRating,
        getMostListenedGenre,
        getAverageRatingForArtist,
        getHighestRatedArtist,
        editAlbum,
      }}
    >
      {children}
    </AlbumCollectionContext.Provider>
  );
};
