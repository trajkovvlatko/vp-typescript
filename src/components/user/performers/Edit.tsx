import React, {useEffect, useState, useContext} from 'react';

import Form from './Form';
import GenresForm from './genres/Form';
import YoutubeLinksForm from '../youtube_links/Form';
import ImagesForm from '../images/Form';
import UserContext from 'contexts/UserContext';
import NotificationContext from 'contexts/NotificationContext';

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
  Genres: GenreInterface[];
  YoutubeLinks: YoutubeLinkInterface[];
  Images: ImageInterface[];
}

function EditPerformer(props: Props) {
  const {user} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const host = process.env.REACT_APP_API_HOST;
  const url: string = `${host}/user/performers/${props.id}`;
  const id = props.id;
  const token = user.token;
  let defaultValues: EditBasicPerformerInterface = {
    id: props.id,
    name: '',
    details: '',
    location: '',
    phone: '',
    website: '',
    Genres: [],
    YoutubeLinks: [],
    Images: [],
  };

  const [values, setValues] = useState({
    loading: true,
    error: false,
    performer: defaultValues,
  });

  useEffect(() => {
    fetch(url, {headers: getAuthHeader(token as string)})
      .then((response) => response.json())
      .then((response) => {
        const newValues: EditBasicPerformerInterface = {
          id: id,
          name: response.name,
          details: response.details,
          location: response.location,
          phone: response.phone,
          website: response.website,
          Genres: response.Genres,
          YoutubeLinks: response.YoutubeLinks,
          Images: response.Images,
        };
        setValues({
          loading: false,
          error: false,
          performer: newValues,
        });
      });
  }, [id, url, token]);

  async function save(newValues: BasicPerformerInterface) {
    try {
      const resp = await axios.patch(
        `${host}/user/performers/${values.performer.id}`,
        newValues,
        {headers: getAuthHeader(user.token as string)}
      );
      if (resp.status === 200) {
        setNotification({
          type: 'info',
          message: 'The performer is successfully saved.',
        });
      }
    } catch (_) {
      setNotification({type: 'info', message: 'Error while saving performer.'});
    }
  }

  if (values.loading) {
    return <div>Loading...</div>;
  }

  const selectedGenreIds: number[] = values.performer.Genres.map((r) => r.id);

  return (
    <div>
      <h1>Edit Performer</h1>

      <Form values={values.performer} save={save} />
      <ImagesForm
        id={props.id}
        type='performer'
        images={values.performer.Images}
      />
      <GenresForm performerId={props.id} selected={selectedGenreIds} />
      <YoutubeLinksForm
        id={props.id}
        type='performer'
        links={values.performer.YoutubeLinks}
      />
    </div>
  );
}

export default EditPerformer;
