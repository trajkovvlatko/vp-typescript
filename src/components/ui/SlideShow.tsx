import React, {useState} from 'react';
import ImageInterface from 'interfaces/ImageInterface';

import {ArrowForwardIos, ArrowBackIos} from '@material-ui/icons';

import '../../styles/components/ui/SlideShow.scss';

interface Props {
  images: ImageInterface[];
  active: boolean;
  close: () => void;
}

function SlideShow(props: Props) {
  const [current, setCurrent] = useState<number>(0);

  const previous = () => {
    let index = current - 1;
    if (index < 0) {
      index = props.images.length - 1;
    }
    setCurrent(index);
  };

  const next = () => {
    let index = current + 1;
    if (index >= props.images.length) {
      index = 0;
    }
    setCurrent(index);
  };

  return (
    <div className={`slide-show ${props.active ? 'active' : ''}`}>
      <button className='arrows left' onClick={previous}>
        <ArrowBackIos />
      </button>
      <div className='images'>
        {props.images.map((img, i) => {
          return (
            <div
              key={`slide-show-img-${img.id}`}
              className={`image ${current === i ? 'active' : ''}`}
            >
              <img src={img.imageUrl} alt='' />
            </div>
          );
        })}
      </div>
      <button className='arrows right' onClick={next}>
        <ArrowForwardIos />
      </button>
      <div className='close' onClick={props.close}>
        &times;
      </div>
    </div>
  );
}
export default SlideShow;
