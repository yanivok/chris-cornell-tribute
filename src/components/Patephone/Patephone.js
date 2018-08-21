import React, { Component } from 'react';
import Draggable from 'gsap/Draggable';
import './Patephone.css';

class Patephone extends Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		Draggable.create("#patiphone", {
			type:"rotation",
			throwProps:true,
			onDragEnd: this.props.onScratch.bind(this)
		 });
	}

	render() {
		let myStyle = this.props.isSongPlaying ? {
			opacity: '0.1'
		} : null;
		const backgroundStyle = {
			background: `url(${this.props.backgroundImage})`,
			backgroundSize: 'cover',
		}
		return (
			<div id="patiphone" className={`patiphone-container ${this.props.isSongPlaying ? 'rotate' : ''}`} style={myStyle}>
				<div className="white-circle" style={backgroundStyle}>
					<div className="patiphone-artist-name">
						Best Live
					</div>
					<div className="small-circle"></div>
					<div className="patiphone-artist-years">
						 Performances
					</div>
				</div>
			</div>
		);
	}
}

export default Patephone;