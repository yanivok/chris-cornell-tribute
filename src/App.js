import React, { Component } from 'react';
import firebase from 'firebase/app';
import Video from './components/Video/Video';
import Patephone from './components/Patephone/Patephone';
import NoiseContainer from './components/NoiseContainer/NoiseContainer';
import LoginPage from './components/LoginPage/LoginPage';
import { PlaylistPicker } from './components/PlaylistPicker/PlaylistPicker';
import { Loader } from 'semantic-ui-react'; 
import './App.css';
import './fonts/fonts.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userCredential: null,
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
    firebase.auth().getRedirectResult().then(this.setUser);
    firebase.auth().onAuthStateChanged((user) => {
      const credential = JSON.parse(sessionStorage.getItem('userCredential'));
      this.setState({ userCredential: credential, user }, this.handleUserLogin);
    });
  }

  setUser = ({credential, user}) => {
    if (credential) {
      sessionStorage.setItem('userCredential', JSON.stringify(credential));
    }
    this.setState({ userCredential: credential, user }, this.handleUserLogin);
  }

  logOut = () => {
    firebase.auth().signOut();
  }

  handleUserLogin = () => {
    if (this.state.user && this.state.userCredential) {
      this.fetchUserPlaylists();
    }
  }

  fetchUserPlaylists = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?key=${this.API_KEY}&access_token=${this.state.userCredential.accessToken}&mine=true&part=snippet,contentDetails`)
    const data = await response.json();
    if (data.error) {
      sessionStorage.removeItem('userCredential');
      return;
    }
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

  onNextSong = () => {
    if (this.state.currentVideoIndex === this.state.videos.length - 1){ 
      return;
    }
    this.setState({currentVideoIndex: this.state.currentVideoIndex + 1,  isSongPlaying: false},
      () => {
        this.onStartSong();
      }
    );
  }

  onPreviousSong = () => {
    if (this.state.currentVideoIndex === 0) {
      return;
    }
    this.setState({ currentVideoIndex: this.state.currentVideoIndex - 1, isSongPlaying: false },
      () => {
        this.onStartSong();
      }
    );
  }

  onPlayerReady = (event) => {
    this.setState({player: event.target});
  }

  onPlaylistPick = async (playlistId) => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${this.API_KEY}&access_token=${this.state.userCredential.accessToken}&part=snippet,contentDetails&playlistId=${playlistId}`);
    const data = await response.json();
    this.setState({ selectedPlaylist: playlistId }, () => this.setVideos(data));
  }

  render() {
    if (!this.state.user || !this.state.userCredential) {
      return (
        <LoginPage />
      );
    }
    if (!this.state.selectedPlaylist && this.state.userPlaylists) {
      return (
        <PlaylistPicker playlists={this.state.userPlaylists} onPlaylistPick={this.onPlaylistPick}/>
      );
    }
    if (this.state.currentVideo) {
      const {title, thumbnails} = this.state.currentVideo;
      return (
        <div className="main-container">
          <Video currentVideo={this.state.currentVideo}
                 onSongEnd={this.onSongEnd}
                 onStartSong={this.onStartSong} onPlayerReady={this.onPlayerReady}/>
          <NoiseContainer showNoise={false} />
          <Patephone isSongPlaying={this.state.isSongPlaying}
                     onScratchForward={this.onNextSong}
                     onScratchBackwards={this.onPreviousSong}
                     backgroundImage={thumbnails.standard.url}/>
          <div className="video-title">
            <div className="song">{title}</div>
          </div>
          {/* <div className="logOutBtn" onClick={this.logOut}>Sign Out</div> */}
        </div>
      );
    }
    return <Loader inverted>Loading</Loader>;
  }
}

export default App;
