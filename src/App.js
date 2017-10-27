import React, { Component } from 'react';
import Video from './Video.js';
import Patephone from './Patephone.js';
import videosArray from './videos.json';
import NoiseContainer from './NoiseContainer.js';
import './App.css';
import './fonts/fonts.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      currentVideoIndex: 0,
      currentVideo: null,
      isSongPlaying: false
    }
  }

  componentWillMount() {
    this.onStartSong();
  }

  onStartSong = () => {
    this.setState({currentVideo: videosArray[this.state.currentVideoIndex]}, () => {
      this.setState({isSongPlaying: true});
    });
  }

  onSongEnd = () => {
    if (this.state.currentVideoIndex === videosArray.length - 1){ 
      this.setState({ isSongPlaying: false });
      return;
    }
    this.setState({currentVideoIndex: this.state.currentVideoIndex + 1,  isSongPlaying: false},
      () => {
        this.onStartSong();
      }
    );
  }

  onPlayerReady = (event) => {
    this.setState({player: event.target});
  }

  onUserScratch = (event) => {
    const currentPlaybackRate = this.state.player.getPlaybackRate();
    this.state.player.setPlaybackRate(currentPlaybackRate + 1);
    console.log(this.state.player.getPlaybackRate());
  }

  render() {
    return (
      <div className="main-container">
        <Video currentVideo={this.state.currentVideo}
               onSongEnd={this.onSongEnd}
               onStartSong={this.onStartSong} onPlayerReady={this.onPlayerReady}/>
        <NoiseContainer showNoise={false} />
        <Patephone isSongPlaying={this.state.isSongPlaying} onScratch={this.onUserScratch}/>
        <div className="video-title">
          <div className="band">{this.state.currentVideo.band}</div>
          <div className="song">{this.state.currentVideo.title}</div>
        </div>
      </div>
    );
  }
}

export default App;
