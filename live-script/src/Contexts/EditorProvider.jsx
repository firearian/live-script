import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Collaboration } from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import ScriptType from '../Extensions/ScriptType';
import * as Y from 'yjs';

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      history: false, // important because history will now be handled by Y.js
    }),
    ScriptType,
    Collaboration.configure({
      document: yDoc,
    }),
    CollaborationCursor.configure({
      provider: websocketProvider,
    }),
  ],
  content: '',
});
