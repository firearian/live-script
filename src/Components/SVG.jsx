import PropTypes from 'prop-types';
import remixiconUrl from './remixicon.symbol.svg';

function MenuButton({ buttonOnClick, buttonClassName, iconName }) {
  return (
    <button type='button' onClick={buttonOnClick} className={buttonClassName}>
      <svg className='remix'>
        <use xlinkHref={`${remixiconUrl}#ri-${iconName}`} />
      </svg>
    </button>
  );
}
MenuButton.propTypes = {
  buttonOnClick: PropTypes.func,
  buttonClassName: PropTypes.string,
  iconName: PropTypes.string,
};

MenuButton.defaultProps = {
  buttonOnClick: () => {},
  buttonClassName: '',
  iconName: '',
};
export default MenuButton;
