import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

import './PlaylistPicker.css';

export const PlaylistPicker = ({ playlists, onPlaylistPick}) => {
  const userPlaylists = playlists.map((playlist, index) => {
    const { thumbnails, title, description, publishedAt } = playlist.snippet;
    const extra = (
      <Card.Content extra>
        <Icon name='user' />
        {playlist.contentDetails.itemCount} Videos
      </Card.Content>
    );
    return (
      <Card key={index} onClick={() => onPlaylistPick(playlist.id)}
            image={thumbnails.standard.url}
            header={title}
            meta={`Published at ${publishedAt.toString()}`}
            description={description}
            extra={extra}
      />
    )
  });
  return (
    <div className="playlistPicker">
      {userPlaylists}
    </div>
  );
}
