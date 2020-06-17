import React, {useState} from 'react';

import SlideShow from './SlideShow';

import ImageInterface from 'interfaces/ImageInterface';

import '../../styles/components/ui/ImageGallery.scss';

interface Props {
  images: ImageInterface[];
}

function ImageGallery(props: Props) {
  const [slideShowActive, setSlideShowActive] = useState<boolean>(false);
  let selectedImage: string = '';
  let otherImages: string[] = [];
  props.images.forEach((i) => {
    if (i.selected) {
      selectedImage = i.imageUrl;
    } else {
      otherImages.push(i.imageUrl);
    }
  });

  function click() {
    setSlideShowActive(true);
  }

  function close() {
    setSlideShowActive(false);
  }

  return (
    <div>
      <div className='col-8'>
        <img src={selectedImage} alt='main' onClick={click} />
      </div>
      <div className='col-4'>
        <img src={otherImages[0]} alt='side-1' onClick={click} />
        <img src={otherImages[1]} alt='side-2' onClick={click} />
      </div>
      <SlideShow close={close} active={slideShowActive} images={props.images} />
    </div>
  );
}

export default ImageGallery;
