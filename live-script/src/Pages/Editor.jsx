import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Collaboration } from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';
import { useEffect, useState } from 'react';
import MenuBar from '../Components/MenuBar';
import ScriptType from '../Extensions/ScriptType';

const yDoc = new Y.Doc();
const websocketProvider = new HocuspocusProvider({
  url: 'ws://0.0.0.0:3001/api/collaboration/:document',
  // url: 'ws://159.122.186.74:32592',
  name: 'room',
  document: yDoc,
  token: localStorage.getItem('lstoken'),
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
    content: '',
  });

  useEffect(() => {
    // at start of render -> Update status changes
    websocketProvider.on('status', (event) => {
      setStatus(event.status);
    });
  }, []);

  // do I need this if I don't change users?
  useEffect(() => {}, [yDoc, EditorContent]);

  // do I need this if I don't change users?
  useEffect(() => {
    if (editor && currentUser) {
      editor.chain().focus().updateUser(currentUser).run();
    }
  }, [editor, currentUser]);

  useEffect(
    () => () => {
      websocketProvider.on('close');
    },
    [],
  );

  return (
    <div className='editor'>
      <EditorContent className='editor bg-white h-9999' editor={editor} />
      {editor && <MenuBar editor={editor} />}
    </div>
  );
}

export default Tiptap;
