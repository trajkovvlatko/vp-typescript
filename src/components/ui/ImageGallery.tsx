import React from 'react';
import ImageInterface from 'interfaces/ImageInterface';

interface Props {
  images: ImageInterface[];
}

function ImageGallery(props: Props) {
  let selectedImage: string = '';
  let otherImages: string[] = [];
  props.images.forEach((i) => {
    if (i.selected) {
      selectedImage = i.imageUrl;
    } else {
      otherImages.push(i.imageUrl);
    }
  });

  return (
    <div>
      <div className='col-8'>
        <img src={selectedImage} alt='main' />
      </div>
      <div className='col-4'>
        <img src={otherImages[0]} alt='side-1' />
        <img src={otherImages[1]} alt='side-2' />
      </div>
    </div>
  );
}

export default ImageGallery;
