/* eslint-disable object-shorthand */
import { useState, useEffect, useCallback } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';
import { useCurrentContext } from './Contexts/CurrentContext';
import { useWebSocketContext } from './Contexts/WebSocketContext';
import { useLocalStorageContext } from './Contexts/LocalStorageContext';
import websocketProvider from './Contexts/WebSocketProvider';
import EditorContainer from './Pages/EditorContainer';
import Editor from './Pages/Editor';
import LoginPage from './Pages/Login';
import ErrorPage from './error404';
import Spinner from './Components/Spinner';

function Routers() {
  const { isAuthenticated, setIsAuthenticated, setCurrentUser, currentRoom, setCurrentRoom } =
    useCurrentContext();
  const { provider, setProvider, shouldReconnect, setShouldReconnect } = useWebSocketContext();
  const { token, user } = useLocalStorageContext();
  const [wsStatus, setWsStatus] = useState(provider?.status || '');
  const { status, document } = provider ?? {};

  const providerConfig = useCallback(() => {
    const yDoc = new Y.Doc();
    setProvider(
      new HocuspocusProvider({
        websocketProvider: websocketProvider,
        document: yDoc,
        token: token,
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
  }, [shouldReconnect, providerConfig, provider]);

  useEffect(() => {
    if (isAuthenticated && wsStatus !== 'connected' && wsStatus !== 'connecting') {
      providerConfig();
      setWsStatus('disconnected');
    }
  }, [isAuthenticated, wsStatus, providerConfig]);

  useEffect(() => {
    if (isAuthenticated && wsStatus === 'disconnected') {
      provider?.connect();
      setShouldReconnect('');
    }
  }, [wsStatus, shouldReconnect, isAuthenticated, provider]);

  const editorComponent = () =>
    wsStatus === 'connected' && (
      <EditorContainer>
        <Editor
          websocketProvider={provider}
          currentUser={user}
          isConnected={status === 'connected'}
          yDoc={document}
        />
      </EditorContainer>
    );

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? (
        editorComponent()
      ) : (
        <LoginPage
          setCurrentUser={setCurrentUser}
          setIsAuthenticated={setIsAuthenticated}
          setCurrentRoom={setCurrentRoom}
        />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/editor',
      element: isAuthenticated ? editorComponent() : <Navigate to='/' replace />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={appRouter} fallbackElement={<Spinner />} />;
}

export default Routers;
