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
        <Video src="https://www.youtube.com/embed/7QU1nvuxaMA" />
        <Patephone />
      </div>
    );
  }
}

export default App;
