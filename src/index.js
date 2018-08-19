import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const config = {
  apiKey: "AIzaSyAkoQP-RNQ78mpwcwQJHcQYXFNu_1hyIGQ",
  authDomain: "my-tribute.firebaseapp.com",
  databaseURL: "https://my-tribute.firebaseio.com",
  projectId: "my-tribute",
  storageBucket: "",
  messagingSenderId: "322342433017"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
