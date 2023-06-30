import PropTypes from 'prop-types';

function RoomList({ roomArray, selectedRoom, handleRoomClick }) {
  return (
    <ul>
      {roomArray?.map((element) => (
        <div className='box-border cursor-pointer flex flex-row items-center'>
          <div className={`${selectedRoom === element ? 'w-2 h-8' : 'w-0 h-2'} fcol`} />
          <li
            key={element}
            className={`${
              selectedRoom === element ? 'bg-gray-100 border-y-2 border-gray-700' : ''
            } py-2 text-sm justify-center`}
          >
            <button
              type='button'
              className={selectedRoom === element ? 'selected -left-0.5' : ''}
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
  roomArray: PropTypes.arrayOf(PropTypes.string),
  selectedRoom: PropTypes.string,
  handleRoomClick: PropTypes.func,
};

RoomList.defaultProps = {
  roomArray: [],
  selectedRoom: '',
  handleRoomClick: () => {},
};

export default RoomList;
