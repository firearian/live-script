import { useState, useEffect, useCallback } from 'react';
import { useCurrentContext } from './Contexts/CurrentContext';
import { useLocalStorageContext } from './Contexts/LocalStorageContext';
import { useWebSocketContext } from './Contexts/WebSocketContext';
import useChangeRoom from './helperFunctions';
import useLogout from './useLogout';
import Routers from './routes';
import LogoutButton from './Components/LogoutButton';
import MenuContainer from './Components/MenuContainer';
import remixiconUrl from './Components/remixicon.symbol.svg';
import './App.css';
import './index.css';

function App() {
  const { isAuthenticated, setIsAuthenticated, currentRoom } = useCurrentContext();
  const { provider } = useWebSocketContext();
  const { handleChangeRoom } = useChangeRoom();
  const [isOpen, setIsOpen] = useState(false);
  const { token, user } = useLocalStorageContext();
  const userCount = provider?.configuration?.awareness.states.size;

  const { handleLogout } = useLogout();

  useEffect(() => {
    if (token && currentRoom && user) {
      setIsAuthenticated(true);
    }
  }, [user, currentRoom, token, setIsAuthenticated]);

  const handleRoomClick = (newRoom) => {
    handleChangeRoom(newRoom);
    setIsOpen(false);
  };

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <div className='App'>
      <header className='App-header'>
        {user?.documents && (
          <MenuContainer
            isOpen={isOpen}
            toggleMenu={toggleMenu}
            handleRoomClick={handleRoomClick}
            setIsOpen={setIsOpen}
            isVisible={isAuthenticated}
          />
        )}
        <div className='editor__header'>
          {user && (
            <div className='header-container'>
              {isAuthenticated && (
                <>
                  <div className='online-users'>
                    <i>{user.name}</i> online with <b>{userCount - 1}</b> other users in{' '}
                    <b>{currentRoom}</b>
                  </div>
                  <div className='room-title'>
                    <svg>
                      <use xlinkHref={`${remixiconUrl}#ri-quill-pen-fill`} />
                    </svg>
                    <h>{currentRoom}</h>
                  </div>
                </>
              )}
              <LogoutButton closeApp={handleLogout} />
            </div>
          )}
        </div>
        <Routers />
      </header>
      <div className='static-footer' />
    </div>
  );
}

export default App;
