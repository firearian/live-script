import { Editor } from '@tiptap/react';
import PropTypes from 'prop-types';
import './MenuBar.css';

import React, { Fragment } from 'react';

import MenuItem from './MenuItem';
import ColorPicker from './ColorPicker';

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
      icon: 'paint-fill',
      title: 'Color',
      action: (event) => editor.chain().focus().setColor(event.target.value).run(),
      value: editor.getAttributes('textStyle').color,
      isActive: () => editor.isActive('color'),
    },
    {
      icon: 'paint-line',
      title: 'remove-color',
      action: (event) => editor.chain().focus().unsetColor().run(),
      isActive: () => editor.isActive('remove-color'),
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
        const key = item.icon ? item.icon : item.type + index;
        return (
          <Fragment key={key}>
            {item.type === 'divider' && <div className='divider' />}
            {item.title === 'Color' && <ColorPicker item={item} />}
            {item.type !== 'divider' && item.title !== 'Color' && <MenuItem item={item} />}
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
