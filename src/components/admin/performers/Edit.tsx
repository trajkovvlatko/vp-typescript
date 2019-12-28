import React, {useEffect, useState} from 'react';
import GenresForm from './genres/Form';
import YoutubeLinksForm from './youtube_links/Form';
import UserContext from '../../../contexts/UserContext';
import BasicPerformer from '../../../interfaces/BasicPerformer';
import Genre from '../../../interfaces/GenreInterface';
import YoutubeLink from '../../../interfaces/YoutubeLinkInterface';
import Form from './Form';
import axios from 'axios';
import {getHeader} from '../../../helpers/main';

interface Props {
  id: number;
}

interface EditBasicPerformer extends BasicPerformer {
  id: number;
  genres_list: Genre[];
  youtube_links_list: YoutubeLink[];
}

function EditPerformer(props: Props) {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const url: string = `${host}/admin/performers/${props.id}`;
  let defaultValues: EditBasicPerformer = {
    id: props.id,
    name: '',
    details: '',
    location: '',
    phone: '',
    website: '',
    genres_list: [],
    youtube_links_list: [],
  };

  const [values, setValues] = useState({
    loading: true,
    error: false,
    performer: defaultValues,
  });

  useEffect(() => {
    fetch(url, getHeader(user.token as string))
      .then(response => response.json())
      .then(response => {
        const newValues: EditBasicPerformer = {
          id: props.id,
          name: response.name,
          details: response.details,
          location: response.location,
          phone: response.phone,
          website: response.website,
          genres_list: response.genres_list,
          youtube_links_list: response.youtube_links_list,
        };
        setValues({
          loading: false,
          error: false,
          performer: newValues,
        });
      });
  }, []);

  async function save(newValues: BasicPerformer) {
    // TODO: add try catch
    const resp = await axios.patch(
      `${host}/admin/performers/${values.performer.id}/genres`,
      newValues,
      getHeader(user.token as string)
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
      <GenresForm performerId={props.id} selected={selectedGenreIds} />
      <YoutubeLinksForm performerId={props.id} links={values.performer.youtube_links_list} />
    </div>
  );
}

export default EditPerformer;
