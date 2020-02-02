import React from 'react';
import {useFetch} from 'hooks/useFetch';
import UserContext from 'contexts/UserContext';
import {Link} from 'react-router-dom';

interface Props {
  type: 'performer' | 'venue';
}

function List(props: Props) {
  const type = props.type;
  const host = process.env.REACT_APP_API_HOST;
  const {user} = React.useContext(UserContext);

  const url = `${host}/admin/${type}s`;
  const {error, loading, results} = useFetch(url, user.token);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  return (
    <div className={`${type}s-list`}>
      <Link to={`/admin/${type}s/new`}>New {type}</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {results.map((row: {id: number; name: string}) => {
            return (
              <tr key={`${type}-${row.id}`}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>
                  <Link to={`/admin/${type}s/${row.id}/edit`}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
