import React, { Component } from 'react';
import Video from './Video.js';
import Gradient from './Gradient.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowGradient: true,
      gradientIndex: 1
    }
  }

  componentWillMount() {
    setTimeout(this.setState({shouldShowGradient: false}), 1500);
  }
  
  
  render() {
    return (
      <div className="main-container">
        <Video src="https://www.youtube.com/embed/7QU1nvuxaMA" />
        <div className="main-title">Chris Cornell</div>
        <div className="years">July 20, 1964 – May 18, 2017</div>
        <Gradient index={this.state.gradientIndex} show={this.state.shouldShowGradient}/>
      </div>
    );
  }
}

export default App;
