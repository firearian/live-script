import { useCallback, useState } from 'react';
import { useCurrentContext } from './Contexts/CurrentContext';
import { useWebSocketContext } from './Contexts/WebSocketContext';
import { useLocalStorageContext } from './Contexts/LocalStorageContext';

const useLogout = () => {
  const { removeCurrentContext } = useCurrentContext();
  const { resetProvider } = useWebSocketContext();
  const { removeToken, removeUser, resetLocalStorageContext } = useLocalStorageContext();
  const { resetStates, setResetStates } = useState(false);

  const handleLogout = useCallback(() => {
    removeToken();
    removeUser();
    removeCurrentContext();
    resetProvider();
    resetLocalStorageContext();
    setResetStates();
  }, [removeToken, removeUser, removeCurrentContext, resetProvider]);

  return { handleLogout, resetStates };
};

export default useLogout;
