import {useState} from 'react';

export const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e: any) => {
      let value = e.target.value;
      if (value === 'true' || value === 'false') {
        value = !!value;
      }
      setValues({
        ...values,
        [e.target.name]: value,
      });
    },
  ];
};
