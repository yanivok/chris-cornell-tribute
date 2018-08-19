import React, { Component } from 'react';
import firebase from 'firebase/app';
import Video from './Video.js';
import Patephone from './Patephone.js';
import NoiseContainer from './NoiseContainer.js';
import { PlaylistPicker } from './components/PlaylistPicker/PlaylistPicker';
import './App.css';
import './fonts/fonts.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      player: null,
      currentVideoIndex: 0,
      currentVideo: null,
      isSongPlaying: false,
      userPlaylists: [],
      selectedPlaylist: null,
      videos: [],
    }
    this.API_KEY = 'AIzaSyAkoQP-RNQ78mpwcwQJHcQYXFNu_1hyIGQ';
  }

  componentDidMount() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   this.setState({ user }, this.handleUserLogin);
    // });
  }

  setUser = ({credential, user}) => {
    this.setState({ userCredential: credential, user }, this.handleUserLogin);
  }

  loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/youtube');
    firebase.auth().signInWithPopup(provider).then(this.setUser).catch(this.catchAuthErrors);
  }

  logOut = () => {
    firebase.auth().signOut();
  }

  catchAuthErrors = (error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    const errorObj = {
      status: 1,
      errorMsg:
        `Error occured when trying to authenticate user: \n
       ErrorCode: ${errorCode} \n
       ErrorMessage: ${errorMessage} \n
       UserEmail: ${email} \n
       AuthCredentialType: ${credential}`,
    }
    console.log("Error in google auth :", errorObj);
  }

  handleUserLogin = () => {
    if (this.state.user) {
      this.fetchUserPlaylists();
    }
  }

  fetchUserPlaylists = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?key=${this.API_KEY}&access_token=${this.state.userCredential.accessToken}&mine=true&part=snippet,contentDetails`)
    const data = await response.json();
    this.setUserPlaylists(data);
  }

  setUserPlaylists = (data) => {
    this.setState({ userPlaylists: data.items });
  }

  setVideos = (data) => {
    this.setState({ videos: data.items.map(item => item.snippet) }, this.onStartSong);
  }

  onStartSong = () => {
    this.setState({currentVideo: this.state.videos[this.state.currentVideoIndex]}, () => {
      this.setState({isSongPlaying: true});
    });
  }

  onSongEnd = () => {
    if (this.state.currentVideoIndex === this.state.videos.length - 1){ 
      this.setState({ isSongPlaying: false });
      return;
    }
    this.setState({currentVideoIndex: this.state.currentVideoIndex + 1,  isSongPlaying: false},
      () => {
        this.onStartSong();
      }
    );
  }

  onPlayerReady = (event) => {
    this.setState({player: event.target});
  }

  onUserScratch = (event) => {
    // const currentPlaybackRate = this.state.player.getPlaybackRate();
    // this.state.player.setPlaybackRate(currentPlaybackRate + 1);
    // console.log(this.state.player.getPlaybackRate());
    console.log(event);
  }

  onPlaylistPick = async (playlistId) => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${this.API_KEY}&access_token=${this.state.userCredential.accessToken}&part=snippet,contentDetails&playlistId=${playlistId}`);
    const data = await response.json();
    this.setState({ selectedPlaylist: playlistId }, () => this.setVideos(data));
  }

  render() {
    if (!this.state.user) {
      return (
        <div className="googleLoginBtn" onClick={this.loginWithGoogle}>Connect With Google</div>
      );
    }
    if (!this.state.selectedPlaylist) {
      return (
        <PlaylistPicker playlists={this.state.userPlaylists} onPlaylistPick={this.onPlaylistPick}/>
      );
    }
    if (this.state.currentVideo) {
      return (
        <div className="main-container">
          <Video currentVideo={this.state.currentVideo}
                 onSongEnd={this.onSongEnd}
                 onStartSong={this.onStartSong} onPlayerReady={this.onPlayerReady}/>
          <NoiseContainer showNoise={false} />
          <Patephone isSongPlaying={this.state.isSongPlaying} onScratch={this.onUserScratch}/>
          <div className="video-title">
            <div className="band">{this.state.currentVideo.band}</div>
            <div className="song">{this.state.currentVideo.title}</div>
          </div>
          <div className="logOutBtn" onClick={this.logOut}>Sign Out</div>
        </div>
      );
    }
    return null;
  }
}

export default App;
