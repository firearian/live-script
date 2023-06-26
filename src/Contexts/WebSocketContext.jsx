import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

export const WebSocketContext = createContext();

export const useWebSocketContext = () => useContext(WebSocketContext);

export function WebSocketContextProvider({ children }) {
  const [provider, setProvider] = useState(null);
  const [webSocketRoom, setWebSocketRoom] = useState('');
  const [shouldReconnect, setShouldReconnect] = useState('');

  const connectWS = () => provider.connect();

  useEffect(() => {
    console.log('provider changed within websocket: ', provider);
  }, [provider]);

  const resetProvider = () => {
    setProvider(null);
    setWebSocketRoom('');
    setShouldReconnect('');
  };

  const changeRoom = (name) => {
    console.log('provider deleted.');
    provider.destroy();
    provider.configuration.name = name;
    setShouldReconnect('configure');
  };

  const value = useMemo(() => ({
    provider,
    setProvider,
    resetProvider,
    connectWS,
    changeRoom,
    webSocketRoom,
    setWebSocketRoom,
    shouldReconnect,
    setShouldReconnect,
  }));

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
}
WebSocketContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
