import React from 'react';

interface Props {
  values: {
    name: string;
    details: string;
    location: string;
    phone: string;
    website: string;
  };
  handleChange: (v: any) => void;
  save: () => void;
}

function Form(props: Props) {
  const {values, handleChange, save} = props;
  return (
    <table>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>
            <input
              name='name'
              type='text'
              defaultValue={values.name}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Details:</td>
          <td>
            <textarea
              name='details'
              defaultValue={values.details}
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
              defaultValue={values.phone}
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
              defaultValue={values.website}
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
  );
}

export default Form;
