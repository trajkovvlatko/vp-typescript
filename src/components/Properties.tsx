import React from 'react';
import Property from './Property';
import {useFetch} from 'hooks/useFetch';
import PropertyInterface from 'interfaces/PropertyInterface';
import IdsListInterface from 'interfaces/IdsListInterface';

interface Props {
  values: string[];
  onChange: (params: IdsListInterface) => void;
}

function Properties(props: Props) {
  const url = `${process.env.REACT_APP_API_HOST}/properties`;
  const {error, loading, results} = useFetch(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  let selected = props.values.map((g) => parseInt(g));

  function onChange(strValue: string, checked: boolean) {
    const value: number = parseInt(strValue);
    let newProperties = selected;
    if (checked) {
      newProperties = [...newProperties, value];
    } else {
      newProperties = selected.filter((g) => g !== value);
    }
    selected = newProperties;
    props.onChange({ids: newProperties});
  }

  return (
    <div>
      <h4>Properties</h4>
      {results.map((property: PropertyInterface) => (
        <Property
          checked={selected.indexOf(property.id) > -1}
          property={property}
          key={`property-${property.name}`}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

export default Properties;
