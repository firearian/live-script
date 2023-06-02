import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import KeyboardShortcuts from '../Extensions/KeyboardShortcuts';
import ScriptType from '../Extensions/ScriptType';

const CustomParagraph = Paragraph.extend({
  addCommands() {
    return {
      changeScriptType:
        () =>
        ({ commands }) => {
          const currentType = commands.getScriptType();
          commands.setScriptType(currentType);
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        console.log('Tabby');
        console.log(this.editor);
        this.editor.commands.changeScriptType();
        return true;
      },
    };
  },
});

const Tiptap = function () {
  const editor = useEditor({
    extensions: [StarterKit, KeyboardShortcuts, CustomParagraph, ScriptType],
    content: '<p style="margin-top: 1ch">Hello World!</p>',
  });

  return <EditorContent class='editor bg-white h-9999' editor={editor} />;
};

export default Tiptap;
