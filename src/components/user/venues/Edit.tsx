import React, {useEffect, useState, useContext} from 'react';

import Form from './Form';
import PropertiesForm from './properties/Form';
import YoutubeLinksForm from '../youtube_links/Form';
import ImagesForm from '../images/Form';
import UserContext from 'contexts/UserContext';
import NotificationContext from 'contexts/NotificationContext';

import BasicVenueInterface from 'interfaces/BasicVenueInterface';
import PropertyInterface from 'interfaces/PropertyInterface';
import YoutubeLinkInterface from 'interfaces/YoutubeLinkInterface';
import ImageInterface from 'interfaces/ImageInterface';

import axios from 'axios';
import {getAuthHeader} from 'helpers/main';

import '../../../styles/pages/user/_SharedForm.scss';

interface Props {
  id: number;
}

interface EditBasicVenueInterface extends BasicVenueInterface {
  id: number;
  Properties: PropertyInterface[];
  YoutubeLinks: YoutubeLinkInterface[];
  Images: ImageInterface[];
}

function EditVenue(props: Props) {
  const {user} = useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const url: string = `${host}/user/venues/${props.id}`;
  const id = props.id;
  const token = user.token;
  const {setNotification} = useContext(NotificationContext);
  let defaultValues: EditBasicVenueInterface = {
    id: props.id,
    name: '',
    details: '',
    location: '',
    phone: '',
    website: '',
    Properties: [],
    YoutubeLinks: [],
    Images: [],
  };

  const [values, setValues] = useState({
    loading: true,
    error: false,
    venue: defaultValues,
  });

  useEffect(() => {
    fetch(url, {headers: getAuthHeader(token as string)})
      .then((response) => response.json())
      .then((response) => {
        const newValues: EditBasicVenueInterface = {
          id: id,
          name: response.name,
          details: response.details,
          location: response.location,
          phone: response.phone,
          website: response.website,
          Properties: response.Properties,
          YoutubeLinks: response.YoutubeLinks,
          Images: response.Images,
        };
        setValues({
          loading: false,
          error: false,
          venue: newValues,
        });
      });
  }, [id, url, token]);

  async function save(newValues: BasicVenueInterface) {
    try {
      const resp = await axios.patch(
        `${host}/user/venues/${values.venue.id}`,
        newValues,
        {headers: getAuthHeader(user.token as string)}
      );
      if (resp.status === 200) {
        setNotification({
          type: 'info',
          message: 'The venue is successfully saved.',
        });
      }
    } catch (_) {
      setNotification({type: 'info', message: 'Error while saving venue.'});
    }
  }

  if (values.loading) {
    return <div>Loading...</div>;
  }

  const selectedPropertyIds: number[] = values.venue.Properties.map(
    (r) => r.id
  );

  return (
    <div>
      <h1>Edit Venue</h1>

      <Form values={values.venue} save={save} />
      <ImagesForm id={props.id} type='venue' images={values.venue.Images} />
      <PropertiesForm venueId={props.id} selected={selectedPropertyIds} />
      <YoutubeLinksForm
        id={props.id}
        type='venue'
        links={values.venue.YoutubeLinks}
      />
    </div>
  );
}

export default EditVenue;
