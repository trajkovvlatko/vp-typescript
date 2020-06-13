import React from 'react';

interface Props {
  src: string;
  title?: string;
}

function Iframe(props: Props) {
  const {src, title} = props;
  return (
    <iframe
      title={title || src}
      src={src}
      frameBorder='0'
      allow='encrypted-media; picture-in-picture'
      allowFullScreen
    ></iframe>
  );
}

export default Iframe;
