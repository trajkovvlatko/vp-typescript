import React, {useEffect, useState} from 'react';

import Form from './Form';
import GenresForm from './genres/Form';
import YoutubeLinksForm from '../youtube_links/Form';
import ImagesForm from '../images/Form';
import UserContext from 'contexts/UserContext';

import BasicPerformerInterface from 'interfaces/BasicPerformerInterface';
import GenreInterface from 'interfaces/GenreInterface';
import YoutubeLinkInterface from 'interfaces/YoutubeLinkInterface';
import ImageInterface from 'interfaces/ImageInterface';

import axios from 'axios';
import {getAuthHeader} from 'helpers/main';

interface Props {
  id: number;
}

interface EditBasicPerformerInterface extends BasicPerformerInterface {
  id: number;
  genres_list: GenreInterface[];
  youtube_links_list: YoutubeLinkInterface[];
  images_list: ImageInterface[];
}

function EditPerformer(props: Props) {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const url: string = `${host}/admin/performers/${props.id}`;
  const id = props.id;
  const token = user.token;
  let defaultValues: EditBasicPerformerInterface = {
    id: props.id,
    name: '',
    details: '',
    location: '',
    phone: '',
    website: '',
    genres_list: [],
    youtube_links_list: [],
    images_list: [],
  };

  const [values, setValues] = useState({
    loading: true,
    error: false,
    performer: defaultValues,
  });

  useEffect(() => {
    fetch(url, {headers: getAuthHeader(token as string)})
      .then(response => response.json())
      .then(response => {
        const newValues: EditBasicPerformerInterface = {
          id: id,
          name: response.name,
          details: response.details,
          location: response.location,
          phone: response.phone,
          website: response.website,
          genres_list: response.genres_list,
          youtube_links_list: response.youtube_links_list,
          images_list: response.images_list,
        };
        setValues({
          loading: false,
          error: false,
          performer: newValues,
        });
      });
  }, [id, url, token]);

  async function save(newValues: BasicPerformerInterface) {
    // TODO: add try catch
    const resp = await axios.patch(
      `${host}/admin/performers/${values.performer.id}`,
      newValues,
      {headers: getAuthHeader(user.token as string)}
    );
    console.log('Updated!', resp);
  }

  if (values.loading) {
    return <div>Loading...</div>;
  }

  const selectedGenreIds: number[] = values.performer.genres_list.map(
    r => r.id
  );

  return (
    <div>
      <h1>Edit Performer</h1>
      <Form values={values.performer} save={save} />
      <ImagesForm
        id={props.id}
        type='performer'
        images={values.performer.images_list}
      />
      <GenresForm performerId={props.id} selected={selectedGenreIds} />
      <YoutubeLinksForm
        id={props.id}
        type='performer'
        links={values.performer.youtube_links_list}
      />
    </div>
  );
}

export default EditPerformer;
