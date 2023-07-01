import { useCurrentContext } from './Contexts/CurrentContext';
import { useLocalStorageContext } from './Contexts/LocalStorageContext';

const useChangeRoom = () => {
  const { currentRoom, setCurrentRoom, setIsDocLoaded } = useCurrentContext();
  const { user } = useLocalStorageContext();

  const handleChangeRoom = (newRoom) => {
    if (!newRoom) {
      return;
    }
    if (newRoom !== currentRoom) {
      if (user.documents.includes(newRoom)) {
        console.log('setting false');
        setIsDocLoaded(false);
      }
      setCurrentRoom(newRoom);
    }
  };
  return { handleChangeRoom };
};

export default useChangeRoom;
