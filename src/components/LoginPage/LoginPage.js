import React, { Component } from 'react';
import firebase from 'firebase/app';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/youtube');
    const persistentAuth = await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebase.auth().signInWithRedirect(provider).catch(this.catchAuthErrors);
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

  render() {
    return (
      <div className="googleLoginBtn" onClick={this.loginWithGoogle}>Connect With Google</div>
    );
  }
}

export default LoginPage;