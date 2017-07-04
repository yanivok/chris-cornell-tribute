import React, { Component } from 'react';
import './Patephone.css';

class Pathephone extends Component {
		constructor(props) {
			super(props);
			
		}
		
    render() {
        return (
					<div className="patiphone-container">
					<div className="white-circle">
							<div className="patiphone-artist-name">
							Chris Cornell
							</div>
							<div className="small-circle"></div>
							<div className="patiphone-artist-years">
							1964 - 2017
							</div>
					</div>
					</div>
        );
    }
}

export default Pathephone;