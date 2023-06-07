import PropTypes from 'prop-types';
import remixiconUrl from './remixicon.symbol.svg';
import './MenuItem.css';

export default function MenuItem({ icon, title, action, isActive = null }) {
  return (
    <button
      type='button'
      className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
      onClick={action}
      title={title}
    >
      <svg className='remix'>
        <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
      </svg>
    </button>
  );
}

MenuItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.func,
  isActive: PropTypes.func,
};

MenuItem.defaultProps = {
  icon: '',
  title: '',
  action: null,
  isActive: null,
};
