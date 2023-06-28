import { Editor } from '@tiptap/react';
import PropTypes from 'prop-types';
import './MenuBar.css';

import React, { Fragment } from 'react';

import MenuItem from './MenuItem';

const MenuBar = function ({ editor }) {
  const items = [
    {
      icon: 'bold',
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: 'italic',
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: 'strikethrough',
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: 'mark-pen-line',
      title: 'Highlight',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      type: 'divider',
    },
    {
      type: 'divider',
    },
    {
      icon: 'double-quotes-l',
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: 'separator',
      title: 'Horizontal Rule',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: 'text-wrap',
      title: 'Hard Break',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'arrow-go-back-line',
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: 'arrow-go-forward-line',
      title: 'Redo',
      action: () => editor.chain().enter().focus().run(), // editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className='editor__footer'>
      {items.map((item, index) => {
        const { icon, title, action, isActive } = item;
        const key = item.icon ? item.icon : item.type + index;
        return (
          <Fragment key={key}>
            {item.type === 'divider' ? (
              <div className='divider' />
            ) : (
              <MenuItem icon={icon} title={title.toString()} action={action} isActive={isActive} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

MenuBar.propTypes = {
  editor: PropTypes.instanceOf(Editor),
};

MenuBar.defaultProps = {
  editor: () => {},
};
export default MenuBar;
