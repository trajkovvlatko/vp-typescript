import React, {useState, useRef} from 'react';
import axios from 'axios';
import {getHeader} from '../../../../helpers/main';
import UserContext from '../../../../contexts/UserContext';
import Image from '../../../../interfaces/ImageInterface';

interface Props {
  performerId: number;
  images: Image[];
}

function ImagesForm(props: Props) {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const [images, setImages] = useState(props.images);
  const [newImages, setNewImages] = useState<File[]>([]);
  const newImage = useRef<HTMLInputElement>(null);
  const initialImageIds = props.images.map(i => i.id);

  function remove(id: number) {
    setImages(
      images.filter(i => {
        return i.id !== id;
      })
    );
  }

  function removeNewImage(name: string) {
    setNewImages(newImages.filter(i => i.name !== name));
  }

  function getRemovedIds() {
    const imageIds = images.map(v => v.id);
    return initialImageIds.filter(v => !imageIds.includes(v));
  }

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let authHeader = getHeader(user.token as string);
    const config = {
      headers: {
        ...authHeader.headers,
        ...{'content-type': 'multipart/form-data'},
      },
    };

    const formData = new FormData();
    for (let i = 0; i < newImages.length; i++) {
      formData.append('images[]', newImages[i]);
    }
    formData.append('remove_image_ids', getRemovedIds().toString())
    const url = `${host}/admin/performers/${props.performerId}/images`;
    axios
      .post(url, formData, config)
      .then(response => {
        console.log(response);
      })
      .catch(error => {});
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

      {images.map((row: Image) => {
        return (
          <div key={`image-${row.id}`}>
            <img src={row.image} alt={`alt-${row.image}`} />
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
            {image.name}
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
