/* eslint-disable import/no-extraneous-dependencies */
import { useMemo, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Collaboration } from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import Highlight from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { useLocalStorageContext } from './Contexts/LocalStorageContext';
import ScriptType from './Extensions/ScriptType';

const editorInstance = { value: null };

const useEditor = (isConnected, yDoc, websocketProvider) => {
  const { user } = useLocalStorageContext();
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
          Highlight.configure({
            multicolor: true,
          }),
          Color.configure({
            types: ['textStyle'],
          }),
          TextStyle,
        ],
        content: '',
      });
    }
    return null;
  }, [isConnected, yDoc, websocketProvider]);

  useEffect(() => {
    if (editorInstance.value && user) {
      editorInstance.value.chain().focus().updateUser(user).run();
    }
  }, [user, editorInstance]);

  return editorInstance;
};
export default useEditor;
