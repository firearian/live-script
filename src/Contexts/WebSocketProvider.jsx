/* eslint-disable react/prop-types */
import { HocuspocusProviderWebsocket } from '@hocuspocus/provider';

const websocketProvider = new HocuspocusProviderWebsocket({
  // url: 'ws://0.0.0.0:3001/api/collaboration/:document',
  // url: 'ws://159.122.186.74:32592/api/collaboration/:document',
  url: process.env.REACT_APP_WS_HOST,
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
  onOutgoingMessage(message) {
    console.log('sending message: ', message);
  },
});
export default websocketProvider;
