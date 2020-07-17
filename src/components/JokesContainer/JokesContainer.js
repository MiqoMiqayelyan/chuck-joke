import React, { useState, useCallback, useEffect } from "react";
import { getJoke } from "../../API";
import Button from "../common/Button";
import FavoritesJokes from "../FavoriteJokes";

import "./style.css";

const JokesContainer = () => {
  const [joke, setJoke] = useState("");
  const [isSliding, setIsSliding] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isSameFavorite, setIsSameFavorite] = useState(false);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")));
  }, []);

  const setItemToLocalStorage = item => {
    localStorage.setItem("favorites", JSON.stringify(item));
  };

  const handleGetJoke = useCallback(() => {
    getJoke().then(data => setJoke(data));
    setIsSameFavorite(false);
  }, []);

  const toggleJokeSlide = useCallback(() => {
    if (!isSliding) {
      const jokeSlide = setInterval(() => {
        handleGetJoke();
        setIsSameFavorite(false);
      }, 3000);
      setIsSliding(jokeSlide);
    } else {
      clearInterval(isSliding);
      setIsSliding(null);
    }
  }, [handleGetJoke, isSliding]);

  const addInFavorites = useCallback(() => {
    setIsSameFavorite(state => !state);
    if (isSameFavorite) {
      const arr = favorites.filter(item => item.id !== joke.id);
      setFavorites(arr);
      setItemToLocalStorage(arr);
    } else {
      const arr = [...favorites, joke];
      if (arr.length > 10) arr.shift();
      setFavorites(arr);
      setItemToLocalStorage(arr);
    }
  }, [joke, favorites, isSameFavorite]);

  const deleteFavorites = () => {
    setFavorites([]);
    setItemToLocalStorage([]);
  };

  return (
    <div className="container">
      <FavoritesJokes
        setFavorites={setFavorites}
        deleteFavorites={deleteFavorites}
        favorites={favorites}
      />
      <div className="joke-container">
        <div className="title">
          <p className="info-message">Click on button to get Joke</p>
          <h1 className="joke-message">{joke.value}</h1>
        </div>
        <div className="button-container">
          <Button onClick={handleGetJoke}>Get Joke</Button>
          <Button className="slide-button" onClick={toggleJokeSlide}>
            {isSliding ? "Pause" : "Play"}
          </Button>
          <Button className="favorit-button" onClick={addInFavorites}>
            {isSameFavorite ? "Remove In Favorite" : "Add to Favorite"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JokesContainer;
