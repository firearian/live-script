import { useMemo, useEffect } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Collaboration } from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { useCurrentContext } from './Contexts/CurrentContext';
import ScriptType from './Extensions/ScriptType';

const editorInstance = { value: null };

const useEditor = (isConnected, yDoc, websocketProvider) => {
  const { currentUser } = useCurrentContext();
  editorInstance.value = useMemo(() => {
    if (isConnected) {
      return new Editor({
        extensions: [
          StarterKit.configure({
            history: false,
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
    }
    return null;
  }, [isConnected, yDoc, websocketProvider]);

  useEffect(() => {
    if (editorInstance.value && currentUser) {
      editorInstance.value.chain().focus().updateUser(currentUser).run();
    }
  }, [currentUser, editorInstance]);

  return editorInstance;
};
export default useEditor;
