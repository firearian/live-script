/* eslint-disable object-shorthand */
import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { PropTypes } from 'prop-types';
import * as Y from 'yjs';
import EditorContainer from './Pages/EditorContainer';
import Editor from './Pages/Editor';
import LoginPage from './Pages/Login';
import Spinner from './Components/Spinner';
import ErrorPage from './error404';
import websocketProvider from './Contexts/WebSocketProvider';

const provider = { value: null };
const yDoc = new Y.Doc();

function Routers(props) {
  const { isAuthenticated, setIsAuthenticated } = props;
  const [isConnected, setIsConnected] = useState(false);
  console.log('isconnected1: ', isConnected);
  const [currentUser, setCurrentUser] = useState({});
  console.log('yDoc: ', yDoc);

  useEffect(() => {
    console.log('Router props changed.', props);
    console.log('isconnected: ', isConnected);
    if (isAuthenticated) {
      console.log('tokennnnnn: ', localStorage.getItem('lstoken'));
      const lstoken = localStorage.getItem('lstoken');
      if (provider.value?.token !== lstoken) {
        provider.value = new HocuspocusProvider({
          websocketProvider: websocketProvider,
          document: yDoc,
          token: lstoken,
          name: 'qoom',
        });
      }
      provider.value.connect();
      console.log('isconnectedset: ', isConnected);
      setIsConnected(true);
    } else {
      console.log('isconnectedremoval: ', isConnected);
      setIsConnected(false);
    }
  }, [props]);

  useEffect(() => {
    console.log('Router state changed currentUser: ', currentUser);
  }, [currentUser]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? (
        isConnected && (
          <EditorContainer>
            <Editor
              websocketProvider={provider.value}
              currentUser={currentUser}
              isConnected={isConnected}
              yDoc={provider.value.document}
            />
          </EditorContainer>
        )
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/editor',
      element: isAuthenticated ? (
        isConnected && (
          <EditorContainer>
            <Editor
              websocketProvider={provider.value}
              currentUser={currentUser}
              isConnected={isConnected}
              yDoc={provider.value.document}
            />
          </EditorContainer>
        )
      ) : (
        <Navigate to='/' replace />
      ),
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
}
Routers.propTypes = {
  isAuthenticated: PropTypes.bool,
  setIsAuthenticated: PropTypes.func,
};
Routers.defaultProps = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
};

export default Routers;
