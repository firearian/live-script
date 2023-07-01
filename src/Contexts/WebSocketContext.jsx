import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';
import websocketProvider from './WebSocketProvider';
import { useCurrentContext } from './CurrentContext';
import { useLocalStorageContext } from './LocalStorageContext';

export const WebSocketContext = createContext();

export const useWebSocketContext = () => useContext(WebSocketContext);

const destroyWS = (ws) => ws.destroy();

export function WebSocketContextProvider({ children }) {
  const { isAuthenticated, currentRoom } = useCurrentContext();
  const { token } = useLocalStorageContext();
  const providerRef = useRef([]);
  const [status, setStatus] = useState(providerRef?.current?.status || '');
  const [version, setVersion] = useState(0);

  const providerConfig = useCallback(() => {
    const yDoc = new Y.Doc();
    if (providerRef.current?.configuration) {
      destroyWS(providerRef.current);
      providerRef.current = null;
    }
    const newProvider = new HocuspocusProvider({
      websocketProvider: websocketProvider || null,
      document: yDoc,
      token,
      name: currentRoom || '',
      onStatus(event) {
        setStatus(event.status);
      },
    });
    console.log('setting exitty: ', newProvider);
    providerRef.current = newProvider;
    setVersion(version + 1);
  }, [token, currentRoom]);

  // useEffect(() => {
  //   providerConfig();
  // }, []);

  useEffect(() => {
    if (providerRef.current?.configuration) {
      providerRef.current?.connect();
    }
  }, [version]);

  useEffect(() => {
    if (isAuthenticated && status === 'disconnected') {
      console.log('11');
      providerConfig();
    }
  }, [isAuthenticated, status]);

  const resetProvider = async () => {
    await providerRef.current?.configuration?.websocketProvider?.disconnect();
    await setVersion(0);
    await setStatus('');
  };

  const modifyRoom = () => {
    setVersion(0);
    console.log('12');
    providerConfig();
  };

  useEffect(() => {
    if (
      providerRef.current &&
      currentRoom &&
      currentRoom !== providerRef.current?.configuration.name
    ) {
      modifyRoom();
    } else if (currentRoom === null) {
      console.log('13');
      providerConfig();
    }
  }, [currentRoom]);

  const value = useMemo(
    () => ({
      provider: providerRef.current,
      resetProvider,
      status,
    }),
    [resetProvider, status],
  );

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
}
WebSocketContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
