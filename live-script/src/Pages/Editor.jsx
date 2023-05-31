import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import KeyboardShortcuts from '../Extensions/KeyboardShortcuts';

const Tiptap = function () {
  const editor = useEditor({
    extensions: [StarterKit, KeyboardShortcuts],
    content: '<p>Hello World!</p>',
  });

  return <EditorContent class='editor bg-white h-9999' editor={editor} />;
};

export default Tiptap;
