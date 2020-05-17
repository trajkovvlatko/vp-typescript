import React from 'react';
import {useFetch} from 'hooks/useFetch';
import UserContext from 'contexts/UserContext';

function UserProfilePage() {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const url = `${host}/user/profile`;
  const {error, loading, results} = useFetch(url, user.token);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  return (
    <div>
      <h1>User Profile Page</h1>
      <table>
        <tr>
          <th>Name</th>
          <td>{results.name}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{results.email}</td>
        </tr>
      </table>
    </div>
  );
}

export default UserProfilePage;
