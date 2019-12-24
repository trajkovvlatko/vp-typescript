import React from 'react';
import {useFetch} from '../../hooks/useFetch';
import UserContext from '../../contexts/UserContext';
import {Link} from 'react-router-dom';

function PerformersList() {
  const host = process.env.REACT_APP_API_HOST;
  const {user} = React.useContext(UserContext);

  const url = `${host}/admin/performers`;
  const {error, loading, results} = useFetch(url, user.token);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  return (
    <div className='performers-list'>
      <Link to='/admin/performers/new'>New performer</Link>
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
              <tr>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>
                  <Link to={`/admin/performers/${row.id}/edit`}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PerformersList;
