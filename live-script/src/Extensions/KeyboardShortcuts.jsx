import { Extension } from '@tiptap/core';

const KeyboardShortcuts = Extension.create({
  name: 'customPaste',

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        console.log('Tabby');
        return true;
      },
      Enter: ({ editor }) => {
        const { state } = editor;
        console.log('State:');
        console.log(state.selection);
        // console.log('\nView:');
        // console.log(view);
      },
      a: ({ editor }) => {
        const { state } = editor;
        console.log('State:');
        console.log(state.selection);
        // console.log('\nView:');
        // console.log(view);
      },
    };
  },
});
export default KeyboardShortcuts;
