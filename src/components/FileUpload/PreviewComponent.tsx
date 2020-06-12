import React from 'react';
import { Icon } from '@blueprintjs/core';

export interface PreviewComponentProps {
  url: string;
  type: string;
}

const PreviewComponent = (props: PreviewComponentProps) => {
  const { url, type } = props;
  return (
    <>
      {type.includes('video') || type.includes('audio') ? (
        <video
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain'
          }}
          controls
        >
          <source src={url} type={type} />
          Your browser does not support the video tag.
        </video>
      ) : type.includes('image') ? (
        <img
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain'
          }}
          src={url}
          onClick={() => {
            window.open(url, '_blank');
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Icon icon={'eye-off'} iconSize={100} color={'gray'} />
        </div>
      )}
    </>
  );
};

export default PreviewComponent;
