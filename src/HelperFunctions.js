import { useCurrentContext } from './Contexts/CurrentContext';

const useChangeRoom = () => {
  const { currentRoom, setCurrentRoom, setIsDocLoaded } = useCurrentContext();

  const handleChangeRoom = (newRoom) => {
    if (newRoom !== currentRoom) {
      setIsDocLoaded(false);
      setCurrentRoom(newRoom);
    }
  };
  return { handleChangeRoom };
};

export default useChangeRoom;
