import { useState, useEffect, useCallback } from 'react';
import { useCurrentContext } from './Contexts/CurrentContext';
import { useWebSocketContext } from './Contexts/WebSocketContext';
import { useLocalStorageContext } from './Contexts/LocalStorageContext';
import useLogout from './useLogout';
import Routers from './routes';
import LogoutButton from './Components/LogoutButton';
import MenuContainer from './Components/MenuContainer';
import './App.css';
import './index.css';

function App() {
  const { setIsAuthenticated, currentRoom, setCurrentRoom, selectedRoom } = useCurrentContext();
  const { changeRoom } = useWebSocketContext();
  const [isOpen, setIsOpen] = useState(false);
  const { token, user } = useLocalStorageContext();

  const handleLogout = useLogout();

  useEffect(() => {
    if (token && currentRoom && user) {
      setIsAuthenticated(true);
    }
  }, [user, currentRoom, token]);

  const handleRoomClick = (newRoom) => {
    if (newRoom !== currentRoom) {
      setCurrentRoom(newRoom);
      changeRoom(newRoom);
    }
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
            roomArray={user.documents}
            selectedRooms={selectedRoom}
            handleRoomClick={handleRoomClick}
          />
        )}
        <div className='editor__header'>
          <LogoutButton closeApp={handleLogout} />
        </div>
        <Routers />
      </header>
    </div>
  );
}

export default App;
