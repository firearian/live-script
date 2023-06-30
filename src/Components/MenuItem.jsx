/* eslint-disable react/jsx-no-useless-fragment */
import PropTypes from 'prop-types';
import remixiconUrl from './remixicon.symbol.svg';
import './MenuItem.css';

export default function MenuItem({ item }) {
  const { icon, title, action, isActive } = item;

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
  item: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
    action: PropTypes.func,
    isActive: PropTypes.func,
  }),
};

MenuItem.defaultProps = {
  item: {
    icon: '',
    title: '',
    action: null,
    isActive: null,
  },
};
