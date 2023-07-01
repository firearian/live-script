import PropTypes from 'prop-types';
import { useCurrentContext } from '../Contexts/CurrentContext';
import { useLocalStorageContext } from '../Contexts/LocalStorageContext';

function RoomList({ handleRoomClick }) {
  const { user } = useLocalStorageContext();
  const roomArray = user?.documents;
  const { currentRoom } = useCurrentContext();
  return (
    <ul>
      {roomArray?.map((element) => (
        <div className='box-border cursor-pointer flex flex-row items-center'>
          <div className={`${currentRoom === element ? 'w-2 h-8' : 'w-0 h-2'} fcol`} />
          <li
            key={element}
            className={`${
              currentRoom === element ? 'bg-gray-100 border-y-1 border-gray-700' : ''
            } py-2 text-sm justify-center`}
          >
            <button
              type='button'
              className={currentRoom === element ? 'selected -left-0.5' : ''}
              onClick={() => handleRoomClick(element)}
            >
              {element}
            </button>
          </li>
        </div>
      ))}
    </ul>
  );
}
RoomList.propTypes = {
  handleRoomClick: PropTypes.func,
};

RoomList.defaultProps = {
  handleRoomClick: () => {},
};

export default RoomList;
