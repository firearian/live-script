import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import EditorContainer from './Pages/EditorContainer';
import Editor from './Pages/Editor';
import LoginPage from './Pages/Login';
import Spinner from './Components/Spinner';
import ErrorPage from './error404';

function Routers() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(typeof setIsAuthenticated);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage setIsAuthenticated={setIsAuthenticated} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/editor',
      element: isAuthenticated ? (
        <EditorContainer>
          <Editor />
        </EditorContainer>
      ) : (
        <Navigate to='/' replace />
      ),
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
}

export default Routers;
