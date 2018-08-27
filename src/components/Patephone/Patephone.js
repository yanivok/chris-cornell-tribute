import React, { Component } from 'react';
import Draggable from 'gsap/Draggable';
import './Patephone.css';

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
			onDragEnd: this.onDragEnd.bind(this),
			onDrag: this.onDrag.bind(this),
		 });
	}

	toDegrees = (angle) => angle * (180 / Math.PI);

	onDrag = (event) => {
		if (!event.srcElement._gsTransform) {
			return;
		}
		console.log(event.srcElement._gsTransform.rotation);
	}

	onDragEnd = (event) => {
		if (!event.srcElement._gsTransform) {
			return;
		}
		const rotationDeg = event.srcElement._gsTransform.rotation;
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