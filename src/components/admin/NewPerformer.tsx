import React from 'react';
import axios from 'axios';
import {useForm} from '../../hooks/useForm';
import UserContext from '../../contexts/UserContext';
import {withRouter} from 'react-router-dom';

interface Props {
  history: {
    push: (path: string) => void;
  };
}

function NewPerformer(props: Props) {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;

  const [values, handleChange] = useForm({
    name: '',
    details: '',
    location: '',
    phone: '',
    website: '',
  });

  async function save() {
    // TODO: Add try catch
    const resp = await axios.post(`${host}/admin/performers`, values, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    props.history.push(`/admin/performers/${resp.data.id}/edit`);
  }

  return (
    <div>
      <h1>New Performer</h1>

      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>
              <input
                name='name'
                type='text'
                value={values.name}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Details:</td>
            <td>
              <textarea
                name='details'
                value={values.details}
                rows={5}
                onChange={handleChange}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>
              <select name='location' onChange={handleChange}>
                <option>Sweden</option>
                <option>Denmark</option>
                <option>Norway</option>
                <option>Finland</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>
              <input
                name='phone'
                type='text'
                value={values.phone}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Website:</td>
            <td>
              <input
                name='website'
                type='text'
                value={values.website}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button onClick={save}>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default withRouter(NewPerformer);
