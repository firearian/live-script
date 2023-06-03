import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Collaboration } from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { HocuspocusProvider } from '@hocuspocus/provider';
import React, { useCallback, useEffect, useState } from 'react';
import * as Y from 'yjs';
import ScriptType from '../Extensions/ScriptType';

const yDoc = new Y.Doc();
const websocketProvider = new HocuspocusProvider({
  url: 'ws://0.0.0.0:80',
  name: 'room',
  document: yDoc,
});
const colors = ['#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D'];
const getRandomElement = (list) => list[Math.floor(Math.random() * list.length)];

const getRandomColor = () => getRandomElement(colors);
const getRandomName = () => (Math.random() + 1).toString(36).substring(7);

const getInitialUser = () => ({
  name: getRandomName(),
  color: getRandomColor(colors),
});

function Tiptap() {
  const [status, setStatus] = useState('connecting');
  const [currentUser, setCurrentUser] = useState(getInitialUser);
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
    content: '<p style="margin-top: 1ch">Hello World!</p>',
  });

  useEffect(() => {
    // at start of render -> Update status changes
    websocketProvider.on('status', (event) => {
      setStatus(event.status);
    });
  }, []);

  // do I need this if I don't change users?
  useEffect(() => {
    console.log('errr: ', yDoc);
  }, [yDoc, EditorContent]);

  // do I need this if I don't change users?
  useEffect(() => {
    console.log('User: ', currentUser);
    if (editor && currentUser) {
      // localStorage.setItem('currentUser', JSON.stringify(currentUser));
      editor.chain().focus().updateUser(currentUser).run();
    }
  }, [editor, currentUser]);

  return <EditorContent className='editor bg-white h-9999' editor={editor} />;
}

export default Tiptap;
