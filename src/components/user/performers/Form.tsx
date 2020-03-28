import React from 'react';
import {useForm} from 'react-hook-form';
import BasicPerformerInterface from 'interfaces/BasicPerformerInterface';

interface Props {
  values: {
    name: string;
    details: string;
    location: string;
    phone: string;
    website: string;
  };
  save: (values: BasicPerformerInterface) => Promise<void>;
}

function Form(props: Props) {
  const {values, save} = props;

  const {register, handleSubmit, errors} = useForm();
  const onSubmit = (values: any) => {
    save(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>
              <input
                name='name'
                type='text'
                defaultValue={values.name}
                ref={register({required: true})}
              />
              {errors.name && <p>Invalid name.</p>}
            </td>
          </tr>
          <tr>
            <td>Details:</td>
            <td>
              <textarea
                name='details'
                defaultValue={values.details}
                rows={5}
                ref={register({required: true})}
              ></textarea>
              {errors.details && <p>Invalid details.</p>}
            </td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>
              <select
                name='location'
                ref={register({required: true})}
                defaultValue={values.location}
              >
                <option>Sweden</option>
                <option>Denmark</option>
                <option>Norway</option>
                <option>Finland</option>
              </select>
              {errors.location && <p>Invalid location.</p>}
            </td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>
              <input
                name='phone'
                type='text'
                defaultValue={values.phone}
                ref={register({required: true})}
              />
              {errors.phone && <p>Invalid phone.</p>}
            </td>
          </tr>
          <tr>
            <td>Website:</td>
            <td>
              <input
                name='website'
                type='text'
                defaultValue={values.website}
                ref={register({required: true})}
              />
              {errors.website && <p>Invalid website.</p>}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input type='submit' value='Save' />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default Form;
