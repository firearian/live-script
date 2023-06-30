import { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../LocalStorageFunctions';

export const LocalStorageContext = createContext();

export const useLocalStorageContext = () => useContext(LocalStorageContext);

export function LocalStorageContextProvider({ children }) {
  const [user, setUser, removeUser] = useLocalStorage('ls-user');
  const [token, setToken, removeToken] = useLocalStorage('lstoken');

  const resetLocalStorageContext = () => {
    removeToken();
    removeUser();
  };

  const value = useMemo(() => ({
    user,
    setUser,
    removeUser,
    token,
    setToken,
    removeToken,
    resetLocalStorageContext,
  }));

  return <LocalStorageContext.Provider value={value}> {children} </LocalStorageContext.Provider>;
}
LocalStorageContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
