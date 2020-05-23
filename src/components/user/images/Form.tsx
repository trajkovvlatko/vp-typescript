import React, {useState, useRef, useContext} from 'react';
import axios from 'axios';
import {getAuthHeader} from 'helpers/main';
import UserContext from 'contexts/UserContext';
import NotificationContext from 'contexts/NotificationContext';
import ImageInterface from 'interfaces/ImageInterface';

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
      <h2>Images</h2>

      {images.map((row: ImageInterface) => {
        return (
          <div key={`image-${row.id}`}>
            {selected !== row.id && (
              <button onClick={() => setSelected(row.id)}>Set selected</button>
            )}
            <img src={row.imageUrl} alt={`alt-${row.imageUrl}`} width='100' />
            <button
              onClick={() => {
                remove(row.id);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}

      {newImages.length > 0 && <p>New images</p>}

      {newImages.map((image: File) => {
        return (
          <div key={`${image.name}-${Math.random()}`}>
            <img src={URL.createObjectURL(image)} width='100' alt='' />
            <button
              onClick={() => {
                removeNewImage(image.name);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}

      <form onSubmit={save}>
        <div>
          <input
            type='file'
            name='images[]'
            ref={newImage}
            onChange={onFileInputChange}
            multiple
          />
        </div>

        <button type='submit'>Save images</button>
      </form>
    </div>
  );
}

export default ImagesForm;
