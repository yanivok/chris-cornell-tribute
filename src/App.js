import React, { Component } from 'react';
import Video from './Video.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Video src="https://www.youtube.com/embed/7QU1nvuxaMA?wmode=transparent&amp;rel=0&amp;autoplay=1" />
      </div>
    );
  }
}

export default App;
