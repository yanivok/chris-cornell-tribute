import React, { Component } from 'react';
import Video from './Video.js';
import Patephone from './Patephone.js';
import './App.css';
import './fonts/fonts.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="main-container">
        <Video/>
        <Patephone />
        <div className="video-title">
          <div className="band">audioslave</div>
          <div className="song">like a stone</div>
        </div>
      </div>
    );
  }
}

export default App;
