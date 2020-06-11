import React from 'react';
import {useHistory} from 'react-router-dom';
import {useFetch} from 'hooks/useFetch';
import UserContext from 'contexts/UserContext';
import {useLocalStorage} from 'hooks/useLocalStorage';

import '../../styles/pages/user/UserProfilePage.scss';

function UserProfilePage() {
  const history = useHistory();
  const {user, setUser} = React.useContext(UserContext);
  const arr = useLocalStorage('vp-user', {});
  const setLocalStorageValue = arr[1];
  const host = process.env.REACT_APP_API_HOST;
  const url = `${host}/user/profile`;
  const {error, loading, results} = useFetch(url, user.token);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  const logout = () => {
    setUser({});
    setLocalStorageValue({});
    history.push('/');
  };

  return (
    <div className='user-profile'>
      <h3 className='black'>My profile</h3>
      <table className='col-5'>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{results.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{results.email}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <br />
              <button onClick={logout} className='nav-link primary'>
                Logout
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserProfilePage;
