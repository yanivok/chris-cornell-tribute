import React from 'react';
import './NoiseContainer.css';

const NoiseContainer = (props) => {
		if (props.showNoise){
			return (
					<div className="noiseContain">
						<div></div>
					</div>
			);
		}
		return null;
};

export default NoiseContainer;
