import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditorContainer from './Pages/EditorContainer';
import Editor from './Pages/Editor';
import LoginPage from './Pages/Login';
import Spinner from './Components/Spinner';
import ErrorPage from './error404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/editor',
    element: (
      <EditorContainer>
        <Editor />
      </EditorContainer>
    ),
    errorElement: <ErrorPage />,
  },
]);

function Routers() {
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
}

export default Routers;
