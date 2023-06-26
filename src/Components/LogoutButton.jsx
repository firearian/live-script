import PropTypes from 'prop-types';
import { useCurrentContext } from '../Contexts/CurrentContext';

function LogoutButton(props) {
  const { isAuthenticated } = useCurrentContext();
  const { closeApp } = props;

  return (
    isAuthenticated && (
      <button
        type='button'
        onClick={closeApp}
        className='group relative w-1/8 flex mr-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        Sign out
      </button>
    )
  );
}
LogoutButton.propTypes = {
  closeApp: PropTypes.func,
};
LogoutButton.defaultProps = {
  closeApp: () => {},
};

export default LogoutButton;
