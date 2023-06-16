// useWebSocketManager.js
import { useState, useCallback, useEffect } from 'react';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';
import { useCurrentContext } from './Contexts/CurrentContext';
import { useWebSocketContext } from './Contexts/WebSocketContext';
import { useLocalStorageContext } from './Contexts/LocalStorageContext';
import websocketProvider from './Contexts/WebSocketProvider';

function useWebSocketManager() {
  const { isAuthenticated, currentRoom } = useCurrentContext();
  const { provider, setProvider, shouldReconnect, setShouldReconnect } = useWebSocketContext();
  const { token } = useLocalStorageContext();
  const [wsStatus, setWsStatus] = useState(provider?.status || '');

  const providerConfig = useCallback(() => {
    const yDoc = new Y.Doc();
    setProvider(
      new HocuspocusProvider({
        websocketProvider,
        document: yDoc,
        token,
        name: currentRoom,
        onStatus(event) {
          setWsStatus(event.status);
        },
      }),
    );
  }, [setProvider, token, currentRoom]);

  useEffect(() => {
    if (shouldReconnect === 'configure') {
      providerConfig();
      setShouldReconnect('reconnect');
    } else if (shouldReconnect === 'reconnect') {
      provider?.connect();
      setShouldReconnect('');
    }
  }, [shouldReconnect, setShouldReconnect]);

  useEffect(() => {
    if (isAuthenticated && !wsStatus) {
      providerConfig();
      setWsStatus('disconnected');
    }
  }, [isAuthenticated, wsStatus]);

  useEffect(() => {
    if (isAuthenticated && wsStatus === 'disconnected') {
      provider?.connect();
      setShouldReconnect('');
    }
  }, [wsStatus, isAuthenticated]);

  return { wsStatus, provider };
}
export default useWebSocketManager;
