import React from 'react';

import Iframe from '../../ui/Iframe';
import {DeleteOutlined} from '@material-ui/icons';

interface Props {
  link: string;
  remove: (link: string) => void;
}

function New(props: Props) {
  const {link, remove} = props;
  return (
    <>
      <div className='col-9'>
        <Iframe src={link} />
      </div>
      <div className='col-3'>
        <button onClick={() => remove(link)}>
          <DeleteOutlined />
          <span>Remove</span>
        </button>
      </div>
    </>
  );
}

export default New;
