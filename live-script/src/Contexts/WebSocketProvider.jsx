/* eslint-disable react/prop-types */
import { createContext, useMemo, useContext } from 'react';
import { HocuspocusProviderWebsocket } from '@hocuspocus/provider';
import * as Y from 'yjs';

// export const yDocInstance = new Y.Doc();
// const WebSocketContext = createContext();

// export function WebSocketProvider({ children }) {
//   const yDoc = yDocInstance;
//   const websocketProvider = useMemo(
//     () =>
//       new HocuspocusProvider({
//         url: 'ws://0.0.0.0:3001/api/collaboration/:document',
//         name: 'room',
//         document: yDoc,
//         token: localStorage.getItem('lstoken'),
//         connect: false,
//         onConnect() {
//           console.log('WS connected!');
//         },
//         onOpen() {
//           console.log('WS Opened!');
//         },
//       }),
//     [],
//   );

//   return (
//     <WebSocketContext.Provider value={websocketProvider}>{children}</WebSocketContext.Provider>
//   );
// }

// export const useWebSocket = () => {
//   const websocketProvider = useContext(WebSocketContext);
//   if (!websocketProvider) {
//     throw new Error('useWebSocket must be used within a WebSocketProvider');
//   }
//   return websocketProvider;
// };

const websocketProvider = new HocuspocusProviderWebsocket({
  url: 'ws://0.0.0.0:3001/api/collaboration/:document',
  // url: 'ws://159.122.186.74:32592',
  connect: false,
  onConnect() {
    console.log('WS connected!');
  },
  onClose() {
    console.log('WS Closed!');
  },
  onUpdate() {
    console.log('WS Updated!!!');
  },
  onDisconnect() {
    console.trace();
    console.log('WS Disconnected!');
  },
  onDestroy() {
    console.log('WS Destroyed!');
  },
  onAuthenticationFailed() {
    console.log('WS Auth Failed');
  },
  onMessage(message) {
    console.log('got a message', message);
  },
  onOutgoingMessage(message) {
    console.log('sending message: ', message);
  },
});
export default websocketProvider;
