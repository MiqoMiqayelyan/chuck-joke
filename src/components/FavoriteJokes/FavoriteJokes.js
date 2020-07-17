import React from "react";

import "./style.css";

const FavoriteJokes = ({ favorites = [], deleteFavorites, setFavorites }) => {
  return (
    <div className="favorites-container">
      <div className="favorites-head">
        <h2 className="favorites-title">Favorites</h2>
        <button className="favorites-delete" onClick={deleteFavorites}>
          Delete
        </button>
      </div>
      {favorites.map(favorit => (
        <div key={favorit.id} className="favorit">
          {favorit.value}
        </div>
      ))}
    </div>
  );
};

export default FavoriteJokes;
