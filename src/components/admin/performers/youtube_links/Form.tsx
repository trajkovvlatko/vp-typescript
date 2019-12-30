import React, {useState, useRef} from 'react';
import axios from 'axios';
import {getAuthHeader} from '../../../../helpers/main';
import UserContext from '../../../../contexts/UserContext';
import YoutubeLinkInterface from '../../../../interfaces/YoutubeLinkInterface';

interface Props {
  performerId: number;
  links: YoutubeLinkInterface[];
}

function YoutubeLinksForm(props: Props) {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const [links, setLinks] = useState(props.links);
  const [newLinks, setNewLinks] = useState<string[]>([]);
  const newLink = useRef<HTMLInputElement>(null);
  const initialLinkIds = props.links.map(i => i.id);

  function getRemovedIds() {
    const linkIds = links.map(v => v.id);
    return initialLinkIds.filter(v => !linkIds.includes(v));
  }

  async function save() {
    // TODO: add try catch and error notification
    const resp = await axios.patch(
      `${host}/admin/performers/${props.performerId}/youtube_links`,
      {
        remove_youtube_link_ids: getRemovedIds(),
        new_youtube_links: newLinks,
      },
      {headers: getAuthHeader(user.token as string)}
    );
    console.log('Updated!', resp);
  }

  function remove(id: number) {
    setLinks(
      links.filter(l => {
        return l.id !== id;
      })
    );
  }

  function addNewLink() {
    if (newLink && newLink.current) {
      setNewLinks([...newLinks, newLink.current.value]);
      newLink.current.value = '';
    }
  }

  function removeNewLink(link: string) {
    setNewLinks(newLinks.filter(l => l !== link));
  }

  return (
    <div>
      <h2>Youtube Links</h2>
      {links.map((row: YoutubeLinkInterface) => {
        return (
          <div key={`youtube-link-${row.id}`}>
            {row.link}
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

      {newLinks.length > 0 && <p>New links</p>}

      {newLinks.map((link: string) => {
        return (
          <div key={link}>
            {link}
            <button
              onClick={() => {
                removeNewLink(link);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
      <div>
        <input type='text' ref={newLink} placeholder='Add new link' />
        <button onClick={addNewLink}>Add link</button>
      </div>
      <button onClick={save}>Save</button>
    </div>
  );
}

export default YoutubeLinksForm;
