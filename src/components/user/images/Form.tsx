import React, {useState, useRef, useContext} from 'react';
import axios from 'axios';
import {getAuthHeader} from 'helpers/main';
import UserContext from 'contexts/UserContext';
import NotificationContext from 'contexts/NotificationContext';
import ImageInterface from 'interfaces/ImageInterface';

import {
  CloudUploadOutlined,
  DeleteOutlined,
  CheckOutlined,
} from '@material-ui/icons';

import '../../../styles/components/user/images/Form.scss';

interface Props {
  id: number;
  type: 'performer' | 'venue';
  images: ImageInterface[];
}

function ImagesForm(props: Props) {
  const {user} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const host = process.env.REACT_APP_API_HOST;
  const [images, setImages] = useState(props.images);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [removedImages, setRemovedImages] = useState<number[]>([]);
  const newImage = useRef<HTMLInputElement>(null);
  const selectedImageId = images.filter((img) => img.selected)[0]?.id;
  const [selected, setSelected] = useState<number | null>(selectedImageId);

  function remove(id: number) {
    const currentImages = images.filter((i) => i.id !== id);
    setImages(currentImages);
    removedImages.push(id);
    setRemovedImages(removedImages);
  }

  function removeNewImage(name: string) {
    setNewImages(newImages.filter((i) => i.name !== name));
  }

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const config = {
      headers: {
        ...getAuthHeader(user.token as string),
        ...{'content-type': 'multipart/form-data'},
      },
    };

    const formData = new FormData();
    newImages.forEach((img) => {
      formData.append('images[]', img);
    });
    formData.append('remove_image_ids', removedImages.toString());
    if (selected) {
      formData.append('selected_image_id', selected.toString());
    }
    const url = `${host}/user/${props.type}s/${props.id}/images`;
    try {
      const response = await axios.post(url, formData, config);
      setImages(response.data);
      setNewImages([]);
      setRemovedImages([]);
      const selectedImage = response.data.filter(
        (img: {selected: boolean}) => img.selected
      )[0];
      if (selectedImage) {
        setSelected(selectedImage.id);
      }
      setNotification({type: 'info', message: 'Successfully saved images.'});
    } catch (e) {
      setNotification({type: 'error', message: 'Error saving images.'});
    }
  }

  function onFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      let arr = [];
      for (let i = 0; i < files.length; i++) {
        arr.push(files[i]);
      }
      setNewImages([...newImages, ...arr]);
      if (newImage && newImage.current) {
        newImage.current.value = '';
      }
    }
  }

  return (
    <div>
      <form onSubmit={save} className='col-5 form'>
        <div className='upload-container clear-both'>
          <div className='upload-label'>
            <CloudUploadOutlined />
            <p>Browse files from your computer</p>
          </div>
          <input
            type='file'
            name='images[]'
            ref={newImage}
            onChange={onFileInputChange}
            multiple
          />
        </div>

        <div>
          {images.map((row: ImageInterface) => {
            return (
              <div key={`image-${row.id}`} className='image-row'>
                <img
                  src={row.imageUrl}
                  alt={`alt-${row.imageUrl}`}
                  className='col-5'
                />

                <div className='col-7'>
                  {selected !== row.id && (
                    <button onClick={() => setSelected(row.id)}>
                      <CheckOutlined />
                      <span>Set selected</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      remove(row.id);
                    }}
                  >
                    <DeleteOutlined />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {newImages.length > 0 && (
          <h4>
            New images <small>(not saved yet)</small>
          </h4>
        )}

        <div>
          {newImages.map((image: File) => {
            return (
              <div key={`${image.name}-${Math.random()}`} className='image-row'>
                <img
                  src={URL.createObjectURL(image)}
                  alt=''
                  className='col-5'
                />
                <div className='col-7'>
                  <button
                    onClick={() => {
                      removeNewImage(image.name);
                    }}
                  >
                    <DeleteOutlined />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <br />

        <button className='nav-link primary' type='submit'>
          Save changes
        </button>
      </form>
    </div>
  );
}

export default ImagesForm;
