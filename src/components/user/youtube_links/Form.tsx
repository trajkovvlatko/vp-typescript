import React, {useState, useRef, useContext} from 'react';
import axios from 'axios';
import {getAuthHeader} from 'helpers/main';
import NotificationContext from 'contexts/NotificationContext';
import UserContext from 'contexts/UserContext';
import YoutubeLinkInterface from 'interfaces/YoutubeLinkInterface';
import Persisted from './Persisted';
import New from './New';

import '../../../styles/components/user/youtube_links/Form.scss';

interface Props {
  id: number;
  type: 'performer' | 'venue';
  links: YoutubeLinkInterface[];
}

function YoutubeLinksForm(props: Props) {
  const {user} = useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const {setNotification} = useContext(NotificationContext);
  const [links, setLinks] = useState(props.links);
  const [newLinks, setNewLinks] = useState<string[]>([]);
  const [removedIds, setRemovedIds] = useState<number[]>([]);
  const newLink = useRef<HTMLInputElement>(null);

  async function save() {
    try {
      const resp = await axios.patch(
        `${host}/user/${props.type}s/${props.id}/youtube_links`,
        {
          remove_youtube_link_ids: removedIds,
          new_youtube_links: newLinks,
        },
        {headers: getAuthHeader(user.token as string)}
      );
      setNotification({type: 'info', message: 'Youtube links updated.'});
      setNewLinks([]);
      setLinks(resp.data);
    } catch (e) {
      setNotification({
        type: 'error',
        message: 'Cannot save Youtube links.',
      });
    }
  }

  function remove(id: number) {
    removedIds.push(id);
    setRemovedIds(removedIds);
    const withoutRemoved = links.filter((l) => l.id !== id);
    setLinks(withoutRemoved);
  }

  function addNewLink() {
    if (!newLink || !newLink.current) {
      return;
    }

    const value = newLink.current.value.trim();
    if (value === '') {
      return setNotification({type: 'error', message: 'Invalid link.'});
    }

    // TODO: Unique values here
    const embedLink = newLink.current.value.replace('watch?v=', 'embed/');
    setNewLinks([...newLinks, embedLink]);
    newLink.current.value = '';
    setNotification({type: '', message: ''});
  }

  function removeNewLink(link: string) {
    setNewLinks(newLinks.filter((l) => l !== link));
  }

  return (
    <div className='col-5 form'>
      {links.map((row: YoutubeLinkInterface) => (
        <div className='iframe-row' key={`youtube-link-${row.id}`}>
          <Persisted id={row.id} link={row.link} remove={remove} />
        </div>
      ))}

      {newLinks.length > 0 && (
        <h4>
          New links <small>(not saved yet)</small>
        </h4>
      )}

      {newLinks.map((link: string) => (
        <div className='iframe-row' key={`new-yt-link-${link}`}>
          <New link={link} remove={removeNewLink} />
        </div>
      ))}

      <br />

      <div className='row'>
        <div className='col-7'>
          <input type='text' ref={newLink} placeholder='Add new link' />
        </div>
        <div className='col-5'>
          <button onClick={addNewLink} className='nav-link primary'>
            Add link
          </button>
        </div>
      </div>

      <br />

      <button onClick={save} className='nav-link primary'>
        Save changes
      </button>
    </div>
  );
}

export default YoutubeLinksForm;
