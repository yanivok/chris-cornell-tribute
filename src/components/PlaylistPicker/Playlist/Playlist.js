import React from 'react';

import './Playlist.css';

const onMouseOver = (event, imageUrl) => {
	event.currentTarget.style.background = `url(${imageUrl})`;
}

const onMouseOut = (event) => {
	event.currentTarget.style.background = 'inherit';
}

export const Playlist = ({ image, header, meta, description, itemCount, onPlaylistPick }) => {
	return (
		<div className="playlist" onClick={onPlaylistPick}>
			<div className="playlist-title">{header}</div>
		</div>
	);
}
