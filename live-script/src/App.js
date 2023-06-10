import './App.css';
import './index.css';
import { useState, useEffect, useMemo } from 'react';
import Routers from './routes';
import LogoutContext from './Contexts/ContextProviders';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasLoggedOut, setHasLoggedOut] = useState(true);
  const closeApp = () => {
    console.log('CloseApp renders.');
    localStorage.removeItem('lstoken');
    window.location.href = '../';
    setHasLoggedOut(true);
  };
  console.log('App renders.');

  const contextValue = useMemo(
    () => ({
      hasLoggedOut,
      setHasLoggedOut,
    }),
    [hasLoggedOut, setHasLoggedOut],
  );

  useEffect(() => {
    console.log('App useEffect initial call rendered.');
    const token = localStorage.getItem('lstoken');
    // verfity jwt token
    if (token) {
      setIsAuthenticated(true);
      setHasLoggedOut(false);
    }
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <LogoutContext.Provider value={contextValue}>
          <div className='editor__header'>
            {isAuthenticated && (
              <button
                type='button'
                onClick={closeApp}
                className='group relative w-1/8 flex mr-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Sign out
              </button>
            )}
          </div>
          <Routers isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </LogoutContext.Provider>
      </header>
    </div>
  );
}

export default App;
