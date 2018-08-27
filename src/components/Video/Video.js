import React from 'react';
import YouTube from 'react-youtube';

const Video = (props) => {
  const youtubeOptions = {
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
      id="video-iframe"
      videoId={props.currentVideo.resourceId.videoId}
      opts={youtubeOptions}
      onEnd={props.onSongEnd}
      onReady={props.onPlayerReady}
    />
  )
};

export default Video;