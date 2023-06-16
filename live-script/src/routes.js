/* eslint-disable object-shorthand */
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useCurrentContext } from './Contexts/CurrentContext';
import { useLocalStorageContext } from './Contexts/LocalStorageContext';
import useWebSocketManager from './useWebSocketManager'; // Import the new custom hook
import EditorContainer from './Pages/EditorContainer';
import Editor from './Pages/Editor';
import LoginPage from './Pages/Login';
import ErrorPage from './error404';
import Spinner from './Components/Spinner';

function Routers() {
  const { isAuthenticated, setIsAuthenticated, setCurrentUser, setCurrentRoom } =
    useCurrentContext();
  const { user } = useLocalStorageContext();
  const { wsStatus, provider } = useWebSocketManager();
  const { status, document } = provider ?? {};

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
