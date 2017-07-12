import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Rx from 'rx';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null
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

  onReady_ = (event) => {
    this.setState({player: event.target});
  }

  fastForward = (seconds) => {
    var currentTime = this.state.player.getCurrentTime();
    this.state.player.seekTo(currentTime + seconds, true);
    this.state.player.playVideo();  
  }

  rewind = (seconds) => {
    var currentTime = this.state.player.getCurrentTime();
    this.state.player.seekTo(currentTime - seconds, true);
    this.state.player.playVideo();  
  }

  render() {
    return(
        <YouTube
          className="video-iframe"
          id="video-iframe"
          videoId={this.props.currentVideo.videoId}
          opts={this.youtubeOptions}
          onEnd={this.props.onSongEnd}
          onReady={this.onReady_}
        />
    )
  }
}

export default Video;
