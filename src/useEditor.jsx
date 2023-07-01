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
  const { user, setUser } = useLocalStorageContext();

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
        // onCreate() {
        //   console.log('Editor onCreate!');
        //   console.log('This onCreate: ', this);
        // },
        // onBeforeCreate() {
        //   console.log('Editor onBeforeCreate!');
        // },
        // onSelectionUpdate() {
        //   console.log('Editor onSelectionUpdate');
        // },
        // onDestroy() {
        //   console.log('Editor onDestroy!');
        // },
        // onFocus() {
        //   console.log('Editor onFocus');
        // },
        // onBlur() {
        //   console.log('Editor onBlur');
        // },
        onUpdate(event) {
          if (!event?.editor?.view?.state?.doc?.textContent) {
            return;
          }
          if (!user?.documents.includes(websocketProvider.configuration.name)) {
            const newUser = user;
            newUser.documents.push(websocketProvider.configuration.name);
            setUser(newUser);
          }
          setIsDocLoaded(true);
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
