import React, { Component } from 'react';
import Video from './Video.js';
import Patephone from './Patephone.js';
import videosArray from './videos.json';
import './App.css';
import './fonts/fonts.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideoIndex: 0,
      currentVideo: null
    }
    this.youtubeOptions = {
      height: '100vh',
      width: '100vw',
      playerVars: { 
        autoplay: 1,
        wmode: 'transparent',
        showinfo: 0,
        controls: 0,
        cc_load_policy: 0,
        disablekb: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 0,
        rel: 0
      }
    };
  }

  componentWillMount() {
    this.onStartSong();
  }

  onStartSong = () => {
    this.setState({currentVideo: videosArray[this.state.currentVideoIndex]});
  }

  onSongEnd = () => {
    if (this.state.currentVideoIndex === videosArray.length - 1){ return; }
    this.setState({currentVideoIndex: this.state.currentVideoIndex + 1}, ()=>{
      this.onStartSong();
    })
  }

  render() {
    return (
      <div className="main-container">
        <Video opts={this.youtubeOptions} 
               currentVideo={this.state.currentVideo}
               onSongEnd={this.onSongEnd}
               onStartSong={this.onStartSong} />
        <Patephone />
        <div className="video-title">
          <div className="band">{this.state.currentVideo.band}</div>
          <div className="song">{this.state.currentVideo.title}</div>
        </div>
      </div>
    );
  }
}

export default App;
