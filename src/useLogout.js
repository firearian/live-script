import { useCallback } from 'react';
import { useCurrentContext } from './Contexts/CurrentContext';
import { useWebSocketContext } from './Contexts/WebSocketContext';
import { useLocalStorageContext } from './Contexts/LocalStorageContext';

const useLogout = () => {
  const { removeCurrentContext } = useCurrentContext();
  const { resetProvider } = useWebSocketContext();
  const { removeToken, removeUser, resetLocalStorageContext } = useLocalStorageContext();

  const handleLogout = useCallback(async () => {
    await removeToken();
    await removeUser();
    await removeCurrentContext();
    await resetLocalStorageContext();
    await resetProvider();
  }, [removeToken, removeUser, removeCurrentContext, resetProvider]);

  return { handleLogout };
};

export default useLogout;
