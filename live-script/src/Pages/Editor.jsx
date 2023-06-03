import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import KeyboardShortcuts from '../Extensions/KeyboardShortcuts';
import ScriptType from '../Extensions/ScriptType';

const CustomParagraph = Paragraph.extend({
  addCommands() {
    return {
      isEmpty:
        () =>
        ({ tr }) =>
          !tr.doc.textContent,
      changeScriptType: () => (_ref) => {},
    };
  },
  addKeyboardShortcuts() {
    return {};
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
