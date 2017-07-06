import React from 'react';
import YouTube from 'react-youtube';

export const Video = (props) => {
  return(
      <YouTube
        className="video-iframe"
        videoId={props.currentVideo.videoId}
        opts={props.opts}
        onEnd={props.onSongEnd}
      />
  )
}

export default Video;
