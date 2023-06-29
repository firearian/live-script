import { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';

export const CurrentContext = createContext();

export const useCurrentContext = () => useContext(CurrentContext);

export function CurrentContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isDocLoaded, setIsDocLoaded] = useState(false);

  useEffect(() => {
    console.log('Authentication State: ', isAuthenticated);
  }, [isAuthenticated]);

  const isLoggedOut = !!(isAuthenticated && currentRoom);

  const removeCurrentContext = () => {
    setCurrentRoom(null);
    setIsAuthenticated(false);
  };

  const changeRoom = (newRoom) => {
    if (newRoom !== currentRoom) {
      setCurrentRoom(newRoom);
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      currentRoom,
      setCurrentRoom,
      removeCurrentContext,
      changeRoom,
      isDocLoaded,
      setIsDocLoaded,
    }),
    [isAuthenticated, currentRoom, isDocLoaded],
  );

  return (
    <CurrentContext.Provider value={value} isLoggedOut={isLoggedOut}>
      {children}
    </CurrentContext.Provider>
  );
}
CurrentContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
