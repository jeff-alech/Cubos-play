
import React from 'react';

const MusicListItem = ({ music, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect(music);
  };

  return (
    <li onClick={handleClick} className={`liSongs ${isSelected ? 'selected' : ''}`}>
      <img className="musicCover" src={music.cover} alt={music.title} />
      <h4 className="musicTitle">{music.title}</h4>
      <p className="musicDescription">{music.description}</p>
    </li>
  );
};

export default MusicListItem;
