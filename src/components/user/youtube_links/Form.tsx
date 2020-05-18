import React, {useState, useRef, useContext} from 'react';
import axios from 'axios';
import {getAuthHeader} from 'helpers/main';
import NotificationContext from 'contexts/NotificationContext';
import UserContext from 'contexts/UserContext';
import YoutubeLinkInterface from 'interfaces/YoutubeLinkInterface';
import Persisted from './Persisted';
import New from './New';

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
    setNewLinks([...newLinks, newLink.current.value]);
    newLink.current.value = '';
    setNotification({type: '', message: ''});
  }

  function removeNewLink(link: string) {
    setNewLinks(newLinks.filter((l) => l !== link));
  }

  return (
    <div>
      <h2>Youtube Links</h2>

      {links.map((row: YoutubeLinkInterface) => (
        <Persisted
          id={row.id}
          link={row.link}
          remove={remove}
          key={`youtube-link-${row.id}`}
        />
      ))}

      {newLinks.length > 0 && (
        <p>
          New links <small>(not saved yet)</small>
        </p>
      )}
      {newLinks.map((link: string) => (
        <New link={link} remove={removeNewLink} key={Math.random()} />
      ))}

      <div>
        <input type='text' ref={newLink} placeholder='Add new link' />
        <button onClick={addNewLink}>Add link</button>
      </div>

      <button onClick={save}>Save</button>
    </div>
  );
}

export default YoutubeLinksForm;
