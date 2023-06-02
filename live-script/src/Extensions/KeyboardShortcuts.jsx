import { Extension } from '@tiptap/core';

const KeyboardShortcuts = Extension.create({
  name: 'customPaste',

  addKeyboardShortcuts() {
    return {};
  },
});
export default KeyboardShortcuts;
