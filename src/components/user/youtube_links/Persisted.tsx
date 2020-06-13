import React from 'react';

import Iframe from '../../../components/ui/Iframe';
import {DeleteOutlined} from '@material-ui/icons';

interface Props {
  id: number;
  link: string;
  remove: (id: number) => void;
}

function Persisted(props: Props) {
  const {id, link, remove} = props;
  return (
    <>
      <div className='col-9'>
        <Iframe src={link} />
      </div>

      <div className='col-3'>
        <button onClick={() => remove(id)}>
          <DeleteOutlined />
          <span>Remove</span>
        </button>
      </div>
    </>
  );
}

export default Persisted;
