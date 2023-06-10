/* eslint-disable react/prop-types */
import { Editor, useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Collaboration } from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { PropTypes } from 'prop-types';
import * as Y from 'yjs';
import { useEffect, useState, useContext } from 'react';
import MenuBar from '../Components/MenuBar';
import ScriptType from '../Extensions/ScriptType';
import LogoutContext from '../Contexts/ContextProviders';
// import { websocketProvider } from '../Contexts/WebSocketProvider';

const getRandomName = () => (Math.random() + 1).toString(36).substring(7);

const getInitialUser = () => ({
  name: getRandomName(),
});

const editor = { value: null };

function Tiptap(props) {
  const { currentUser, yDoc, websocketProvider, isConnected } = props;
  const [status, setStatus] = useState('connecting');
  const [test, setTest] = useState('');
  const [test1, setTest1] = useState('');
  const [test2, setTest2] = useState('');
  const { hasLoggedOut, setHasLoggedOut } = useContext(LogoutContext);
  console.log('Routes rendered.');
  console.log(websocketProvider);

  useEffect(() => {
    console.log('Editor props changed.', props);
    console.log('token proppy: ', localStorage.getItem('lstoken'));
    try {
      // editor.value.chain().focus().setTextSelection({ from: 1, to: 4 }).run();
    } catch (error) {
      console.log(error);
    }
  }, [currentUser, test2]);

  useEffect(() => {
    if (status !== 'connected') {
      return;
    }
    editor.value.on('update', (ed) => {
      console.log('eddd', ed.editor);
    });
  }, [test, status]);

  useEffect(() => {
    if (status !== 'connected') {
      return;
    }
    editor.value.on('selectionUpdate', (ed) => {
      console.log('feddd', ed.editor);
      setTest2('a');
      // ed.editor.chain().focus().setTextSelection({ from: 1, to: 4 }).run();
    });
  }, [test1, status]);

  useEffect(() => {
    console.log('Editor state changed status: ', status);
    try {
      editor.value.chain().focus().setTextSelection({ from: 1, to: 4 }).run();
      editor.value.chain().focus().run();
    } catch (error) {
      console.log(error);
    }
  }, [status]);

  useEffect(() => {
    console.log('Document state changed status: ', yDoc);
    try {
      // editor.value.chain().focus().setTextSelection({ from: 1, to: 4 }).run();
    } catch (error) {
      console.log(error);
    }
  }, [yDoc]);

  useEffect(() => {
    console.log('IsConnected Editor initial render');
    console.log('isconnected: ', isConnected);
    if (isConnected) {
      console.log('editor set');
      editor.value = new Editor({
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
      setStatus('connected');
    }
    console.log(websocketProvider);
  }, [isConnected]);

  // do I need this if I don't change users?
  useEffect(() => {
    console.log('New User effect but will "user enter"?');
    if (editor.value && currentUser) {
      console.log('user one entered');
      console.log(editor.value);
      editor.value.chain().focus().updateUser(currentUser).run();
    }
  }, [currentUser]);

  return (
    <div className='editor'>
      {status === 'connected' && (
        <EditorContent className='editor bg-white h-9999' editor={editor.value} />
      )}
      {status === 'connected' && <MenuBar editor={editor.value} />}
    </div>
  );
}
Tiptap.propTypes = {
  currentUser: PropTypes.shape({ name: PropTypes.string, color: PropTypes.string }),
  yDoc: PropTypes.instanceOf(Y.Doc),
  websocketProvider: PropTypes.instanceOf(HocuspocusProvider),
};
Tiptap.defaultProps = {
  currentUser: null,
  yDoc: new Y.Doc(),
  websocketProvider: null,
};

export default Tiptap;
