import PropTypes from 'prop-types';
import MenuButton from './SVG';
import RoomList from './RoomList';

const MenuContainer = function ({ isOpen, toggleMenu, roomArray, selectedRoom, handleRoomClick }) {
  return (
    <div className='contents'>
      <div className='button-container left-4 top-20 absolute m-2 pa'>
        <MenuButton
          buttonClassName='menu-item is-active'
          buttonOnClick={toggleMenu}
          iconName='menu-line'
        />
      </div>
      <div
        className={`menu-container absolute left-0 bg-white top-16 m-4 shadow rounded-lg h-100 border-1 ${
          isOpen ? 'open z1000 pe-a pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className='menu-items relative top-10'>
          <div className='text-black text-center'>
            <div className=''>
              <h2 className='top-5 my-2'>Available Rooms</h2>
              <div className='border w-4/6 mx-auto rounded-3xl -bottom-2' />
              <RoomList
                roomArray={roomArray}
                selectedRooms={selectedRoom}
                handleRoomClick={handleRoomClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
MenuContainer.propTypes = {
  isOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
  roomArray: PropTypes.arrayOf(PropTypes.string),
  selectedRoom: PropTypes.string,
  handleRoomClick: PropTypes.func,
};

MenuContainer.defaultProps = {
  isOpen: null,
  toggleMenu: () => {},
  roomArray: PropTypes.arrayOf(PropTypes.string),
  selectedRoom: '',
  handleRoomClick: () => {},
};
export default MenuContainer;