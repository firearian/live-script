/* eslint-disable react/jsx-no-useless-fragment */
import PropTypes from 'prop-types';
import { useRef } from 'react';
import remixiconUrl from './remixicon.symbol.svg';
import './MenuItem.css';

export default function ColorPicker({ item }) {
  const { icon, title, action, value, isActive = null } = item;
  const colorInputRef = useRef(null);

  const toggleColorInput = () => {
    colorInputRef.current.click();
  };

  return (
    <label htmlFor='color-menu-item' className='relative'>
      <input
        ref={colorInputRef}
        type='color'
        id='color-menu-item'
        className={`menu-item${isActive && isActive() ? ' is-active' : ''} opacity-0 absolute`}
        onInput={action}
        value={value}
      />
      <button
        type='button'
        className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
        onClick={toggleColorInput}
        title={title}
      >
        <svg className='remix'>
          <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
        </svg>
      </button>
    </label>
  );
}

ColorPicker.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
    action: PropTypes.func,
    value: PropTypes.string,
    isActive: PropTypes.func,
  }),
};

ColorPicker.defaultProps = {
  item: {
    icon: '',
    title: '',
    action: null,
    value: '',
    isActive: null,
  },
};
