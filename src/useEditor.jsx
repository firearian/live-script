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
import { useCurrentContext } from './Contexts/CurrentContext';
import ScriptType from './Extensions/ScriptType';

const editorInstance = { value: null };

const useEditor = (isConnected, yDoc, websocketProvider) => {
  const { setIsDocLoaded } = useCurrentContext();
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
        onUpdate(event) {
          if (event?.editor?.view?.state?.doc?.textContent) {
            setIsDocLoaded(true);
          } else {
            setIsDocLoaded(false);
          }
        },
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
