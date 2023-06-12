import React from 'react';
import stop from '../src/assets/stop.svg';
import previous from '../src/assets/previous.svg';
import play from '../src/assets/play.svg';
import pause from '../src/assets/pause.svg';
import next from '../src/assets/next.svg';

const PlayerControls = ({ isPlaying, onPlay, onPause, onStop }) => {
  return (
    <div className="btns">
      <img onClick={onStop} className="stop" src={stop} alt="stopBtn" />
      <img onClick={onPlay} className="prev" src={previous} alt="prevBtn" />
      <img onClick={isPlaying ? onPause : onPlay} className="play" src={isPlaying ? pause : play} alt="playBtn" />
      <img onClick={onStop} className="next" src={next} alt="nextBtn" />
    </div>
  );
};

export default PlayerControls;
