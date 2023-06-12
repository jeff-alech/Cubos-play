import { useState, useRef, useEffect } from 'react';
import './App.css'
import Logo from './assets/logo.svg'
import Profile from './assets/jeff.jpeg'
import { musics } from './musics.js';
import next from './assets/next.svg';
import pause from './assets/pause.svg';
import play from './assets/play.svg';
import previous from './assets/previous.svg';
import stop from './assets/stop.svg';
import circle from './assets/Ellipse 2.png'

export default function App() {
  const [clickPlay, setClickPlay] = useState(false);
  const [titleSelected, setTitleSelected] = useState()
  const [artistSelected, setArtistSelected] = useState()
  const [musicSelected, SetMusicSelected] = useState()
  const [lineSize, setLineSize] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [timerLine, setTimerLine] = useState(null);
  const redLineRef = useRef(null)
  const audioRef = useRef(null)
  const timer = useRef(null); // Ref para o intervalo

  useEffect(() => {
    if (clickPlay) {
      timer.current = setInterval(() => {
        setCurrentTime(prevTime => prevTime + 1);
      }, 1000);

      setTimerLine(timer.current);
    } else {
      clearInterval(timer.current);
    }
  }, [clickPlay]);

  useEffect(() => {
    if (currentTime >= totalTime) {
      btnStop();
    }
  }, [currentTime, totalTime]);

  function btnPlay() {
    audioRef.current.play()
    setClickPlay(true)
    setTimerLine(setTimeout(increaseSize, 1000));
  }

  function increaseSize() {
    const progress = (audioRef.current.currentTime / audioRef.current.duration) || 0;
    const lineSize = Math.min(Math.floor(progress * 568), 568);
    setLineSize(lineSize);
    setTimerLine(setTimeout(increaseSize, 1000));
  }

  function btnPause() {
    audioRef.current.pause()
    setClickPlay(false)
    clearTimeout(timerLine)
  }

  function btnStop() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setClickPlay(false);
    setLineSize(0);
    setCurrentTime(0);
    clearTimeout(timerLine)
    clearInterval(timer.current);
  }

  function btnPrev() {
    const currentIndex = musics.findIndex(music => music.url === musicSelected);
    const prevIndex = currentIndex === 0 ? musics.length - 1 : currentIndex - 1;
    const prevMusic = musics[prevIndex];
    SetMusicSelected(prevMusic.url);
    setTitleSelected(prevMusic.title);
    setArtistSelected(prevMusic.artist);
    setTotalTime(prevMusic.minutes * 60 + prevMusic.seconds);
    setLineSize(0);
    setCurrentTime(0);
    clearTimeout(timerLine);
  }

  function btnNext() {
    const currentIndex = musics.findIndex(music => music.url === musicSelected);
    const nextIndex = (currentIndex + 1) % musics.length;
    const nextMusic = musics[nextIndex];
    SetMusicSelected(nextMusic.url);
    setTitleSelected(nextMusic.title);
    setArtistSelected(nextMusic.artist);
    setTotalTime(nextMusic.minutes * 60 + nextMusic.seconds);
    setLineSize(0);
    setCurrentTime(0);
    clearTimeout(timerLine);
  }

  function btnList(music) {
    const { title, artist, url, minutes, seconds } = music
    setTitleSelected(title)
    setArtistSelected(artist)
    SetMusicSelected(url)
    setTotalTime(minutes * 60 + seconds);
    setLineSize(0);
    setCurrentTime(0);
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <>
      <div className='container'>
        <header className='header'>
          <img className='logoImg' src={Logo} alt="logo" />
          <div className='boxProfile'>
            <img className='photoProfile' src={Profile} alt="profilePhoto" />
            <span className='nameProfile'>Bem-vindo, Jeff Alech</span>
          </div>
        </header>

        <section className='boxSection'>
          <div className='boxTitle'>
            <h3 className='title'>The best play list</h3>
          </div>
          <div className='boxSamples'>
            <ul className='boxSongs'>
              {musics.map((music) => (
                <li onClick={() => btnList(music)} key={music.id} className='liSongs'>
                  <img className='musicCover' src={music.cover} alt={music.title} />
                  <h4 className='musicTitle'>{music.title}</h4>
                  <p className='musicDescription'>{music.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <audio ref={audioRef} src={musicSelected}></audio>
        </section>

        <footer className='footer'>
          <div className='boxTitleAndArtist'>
            <h4 className='footerMusicTitle'>{titleSelected}</h4>
            <p className='footerArtistName'>{artistSelected}</p>
          </div>

          <div className='boxBtn'>

            <div className='btns'>
              <img onClick={btnStop} className='stop' src={stop} alt="stopBtn" />
              <img onClick={btnPrev} className='prev' src={previous} alt="prevBtn" />
              <img onClick={clickPlay ? btnPause : btnPlay} className='play' src={clickPlay ? pause : play} alt="playBtn" />
              <img onClick={() => btnNext(musics)} className='next' src={next} alt="nextBtn" />
            </div>

            <div className='timer'>
              <p className='time'>{formatTime(currentTime)}</p>
              <div className='timeBar'>
                <img className='circleTime' src={circle} style={{ left: lineSize + "px" }} alt="circle" />
                <div ref={redLineRef} className='redLine' style={{ width: lineSize + "px" }}></div>
              </div>
              <p className='time'>{formatTime(totalTime)}</p>
            </div>

          </div>

        </footer>
      </div>
    </>
  )
}
