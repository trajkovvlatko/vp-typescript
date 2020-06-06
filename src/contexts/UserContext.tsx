import React from 'react';

interface UserContextInterface {
  user: {
    token?: string;
    name?: string;
  };
  setUser: (data: {}) => void;
}

const defaultUser = {};
const setUser = () => defaultUser;
const defaults: UserContextInterface = {user: {}, setUser: setUser};
const UserContext = React.createContext<UserContextInterface>(defaults);
export default UserContext;
