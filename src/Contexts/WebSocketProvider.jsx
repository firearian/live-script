/* eslint-disable react/prop-types */
import { HocuspocusProviderWebsocket } from '@hocuspocus/provider';

const websocketProvider = new HocuspocusProviderWebsocket({
  // url: 'ws://0.0.0.0:3001/api/collaboration/:document',
  // url: 'ws://159.122.186.74:32592/api/collaboration/:document',
  url: process.env.REACT_APP_WS_HOST,
  connect: false,
  // onOpen(event) {
  //   console.log('WS onOpen', event);
  // },
  // onConnect() {
  //   console.log('WS onConnect');
  // },
  // onClose() {
  //   console.log('WS onClose');
  // },
  // onStatus(event) {
  //   console.log('WS onStatus', event);
  // },
  // onSynced(event) {
  //   console.log('WS onSynced', event);
  // },
  // onAwarenessUpdate(event) {
  //   console.log('WS onAwarenessUpdate', event);
  // },
  // onAwarenessChange(event) {
  //   console.log('WS onAwarenessChange', event);
  // },
  // onStateless(event) {
  //   console.log('WS onStateless', event);
  // },
  // onDisconnect() {
  //   console.log('WS onDisconnect!');
  // },
  // onDestroy() {
  //   console.log('WS onDestroy');
  // },
  // onAuthenticationFailed() {
  //   console.log('WS onAuthenticationFailed');
  // },
  // onOutgoingMessage(message) {
  //   console.log('WS onOutgoingMessage: ', message);
  // },
});
export default websocketProvider;
