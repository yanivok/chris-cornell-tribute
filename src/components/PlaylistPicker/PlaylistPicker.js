import React from 'react';
import './PlaylistPicker.css';

export const PlaylistPicker = ({ playlists, onPlaylistPick}) => {
  const userPlaylists = playlists.map((playlist, index) => {
    const { channelId, publishedAt, thumbnails, title, description } = playlist.snippet;
    return (
      <div className="playlist" key={index} onClick={() => onPlaylistPick(playlist.id)}>
        <img src={thumbnails.default.url} className="playlistThumbnail" />
        <div className="playlistDataWrapper">
          <div className="playlistDataField">ID: {playlist.id}</div>
          <div className="playlistDataField">channelId: {channelId}</div>
          <div className="playlistDataField">publishedAt: {publishedAt}</div>
          <div className="playlistDataField">Title: {title}</div>
          <div className="playlistDataField">Description: {description}</div>
        </div>
      </div>
    )
  });
  return (
    <div className="playlistPicker">
      {userPlaylists}
    </div>
  );
}
