import React, { Component } from 'react';
import Draggable from 'gsap/Draggable';
import './Patephone.css';

const SONG_DEGREES_OFFSET = 120;

class Patephone extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lastRotationDeg: 0,
		}
	}

	componentDidMount() {
		Draggable.create("#Patephone", {
			type:"rotation",
			throwProps:true,
			// onDragEnd: this.onDragEnd.bind(this),
			onDrag: this.onDrag.bind(this),
		 });
	}

	onDrag = (event) => {
		if (!event.srcElement._gsTransform) {
			return;
		}
		const currentDeg = event.srcElement._gsTransform.rotation % 360;
		const progressToNextSong = ((currentDeg - this.state.lastRotationDeg) / SONG_DEGREES_OFFSET) * 100;
		this.setState({ progressToNextSong }, this.checkProgress);
		// console.log(event.srcElement._gsTransform.rotation % 360);
	}

	checkProgress = () => {
		console.log(this.state.progressToNextSong);
	}

	onDragEnd = (event) => {
		if (!event.srcElement._gsTransform) {
			return;
		}
		const rotationDeg = event.srcElement._gsTransform.rotation % 360;
		if (rotationDeg > this.state.lastRotationDeg) {
			this.props.onScratchForward();
		} else {
			this.props.onScratchBackwards();
		}
		this.setState({lastRotationDeg: rotationDeg});
	}

	render() {
		let myStyle = this.props.isSongPlaying ? {
			opacity: '0.1'
		} : null;
		const backgroundStyle = {
			backgroundImage: `url(${this.props.backgroundImage})`,
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
		}
		return (
			<div id="Patephone" className={`patephone-container ${this.props.isSongPlaying ? 'rotate' : ''}`} style={myStyle}>
				<div className="white-circle" style={backgroundStyle}>
					{this.props.backgroundImage ? null :
						<div className="patephone-artist-name">
							Best Live
						</div>}
					<div className="small-circle"></div>
					{this.props.backgroundImage ? null :
						<div className="patephone-artist-years">
						 	Performances
						</div>}
				</div>
			</div>
		);
	}
}

export default Patephone;