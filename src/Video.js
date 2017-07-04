import React, { Component } from 'react';

class Video extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }
  
  
  render() {
    const iframe = (<iframe
        id="video"
        allowFullScreen='allowFullScreen'
        frameBorder="0"
        height="100vh"
        src={this.props.src +'?wmode=transparent&autoplay=1&showinfo=0&controls=0&cc_load_policy=0&disablekb=1&iv_load_policy=3&modestbranding=1&playsinline=0&rel=0'}
        width="100vw"
        className="video-iframe"
      />)
    return (
      <div>
      {iframe}
      </div>
    );
  }
}

export default Video;
