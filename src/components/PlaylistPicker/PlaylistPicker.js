import React from 'react';
import { Playlist } from './Playlist/Playlist';

import './PlaylistPicker.css';

export const PlaylistPicker = ({ playlists, onPlaylistPick}) => {
  const userPlaylists = playlists.map((playlist, index) => {
    const { thumbnails, title, description, publishedAt } = playlist.snippet;
    return (
      <Playlist key={index} onClick={() => onPlaylistPick(playlist.id)}
            image={thumbnails.standard.url}
            header={title}
            meta={`Published at ${publishedAt.toString()}`}
            description={description}
            itemCount={playlist.contentDetails.itemCount}
      />
    )
  });
  return (
    <div className="playlistPicker">
      {userPlaylists}
    </div>
  );
}
