/* eslint-disable object-shorthand */
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useCurrentContext } from './Contexts/CurrentContext';
import { useLocalStorageContext } from './Contexts/LocalStorageContext';
import { useWebSocketContext } from './Contexts/WebSocketContext';
import EditorContainer from './Pages/EditorContainer';
import Editor from './Pages/Editor';
import LoginPage from './Pages/Login';
import ErrorPage from './error404';
import Spinner from './Components/Spinner';

function Routers() {
  const { isDocLoaded, isAuthenticated } = useCurrentContext();
  const { user } = useLocalStorageContext();
  const { status, provider } = useWebSocketContext();
  const { document } = provider ?? {};

  const editorComponent = () => {
    const ed = (
      <>
        {!isDocLoaded && <Spinner />}
        <Editor
          websocketProvider={provider}
          currentUser={user}
          isConnected={status === 'connected'}
          yDoc={document}
        />
      </>
    );
    return status === 'connected' ? <EditorContainer>{ed}</EditorContainer> : <Spinner />;
  };
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? editorComponent() : <LoginPage />,
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
