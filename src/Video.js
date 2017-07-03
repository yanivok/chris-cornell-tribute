import React from 'react';

const Video = (props) => (
  <iframe
    allowFullScreen
    frameBorder="0"
    height="100vh"
    src={props.src}
    width="100vw"
    className="video-iframe"
  />
);

export default Video;