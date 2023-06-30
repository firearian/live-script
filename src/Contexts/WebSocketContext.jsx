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

export function WebSocketContextProvider({ children }) {
  const { isAuthenticated, currentRoom } = useCurrentContext();
  const { token } = useLocalStorageContext();
  const providerRef = useRef([]);
  const [status, setStatus] = useState(providerRef?.status || '');
  const [version, setVersion] = useState(0);

  const destroyWS = useCallback(() => providerRef.current?.destroy(), []);

  const providerConfig = useCallback(() => {
    const yDoc = new Y.Doc();
    const newProvider = new HocuspocusProvider({
      websocketProvider: websocketProvider || null,
      document: yDoc,
      token: token || null,
      name: currentRoom || '',
      onStatus(event) {
        setStatus(event.status);
      },
    });
    providerRef.current = newProvider;
    setVersion(version + 1);
  }, [token, currentRoom]);

  useEffect(() => {
    providerConfig();
  }, []);

  useEffect(() => {
    if (providerRef.current) {
      providerRef.current?.connect();
    }
  }, [version]);

  useEffect(() => {
    if (isAuthenticated && status === 'disconnected') {
      providerConfig();
    }
  }, [isAuthenticated, status]);

  const resetProvider = () => {
    destroyWS();
    providerRef.current = null;
    setVersion(0);
  };

  const modifyRoom = () => {
    destroyWS();
    providerRef.current = null;
    setVersion(0);
    providerConfig();
  };

  useEffect(() => {
    if (
      providerRef.current &&
      currentRoom &&
      currentRoom !== providerRef.current?.configuration.name
    ) {
      modifyRoom();
    }
  }, [currentRoom]);

  const value = useMemo(() => ({
    provider: providerRef.current,
    resetProvider,
    status,
  }));

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
}
WebSocketContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
