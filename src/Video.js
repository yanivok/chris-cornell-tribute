import React, { Component } from 'react';
import YouTube from 'react-youtube';
import videosArray from './videos.json';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideoIndex: 0,
      currentVideo: null
    }
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
    const opts = {
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
    return (
      <YouTube
        className="video-iframe"
        videoId={this.state.currentVideo.videoId}
        opts={opts}
        onEnd={this.onSongEnd}
      />
    );
  }
}

export default Video;
