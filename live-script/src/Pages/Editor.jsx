import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ScriptType from '../Extensions/ScriptType';

function Tiptap() {
  const editor = useEditor({
    extensions: [StarterKit, ScriptType],
    content: '<p style="margin-top: 1ch">Hello World!</p>',
  });

  return <EditorContent className='editor bg-white h-9999' editor={editor} />;
}

export default Tiptap;
