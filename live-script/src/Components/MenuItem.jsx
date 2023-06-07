/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { Editor } from '@tiptap/react';
import PropTypes from 'prop-types';
import React from 'react';
import remixiconUrl from './remixicon.symbol.svg';
import './MenuItem.css';

// import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';

export default function MenuItem({ icon, title, action, isActive = null }) {
  return (
    <button
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
