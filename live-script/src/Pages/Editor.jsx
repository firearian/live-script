/* eslint-disable react/prop-types */
import { EditorContent } from '@tiptap/react';
import { useEffect } from 'react';
import MenuBar from '../Components/MenuBar';
import { ConnectionStatus } from '../Constants';
import useEditor from '../useEditor';
import useWebSocketManager from '../useWebSocketManager'; // Import the new custom hook

function Tiptap() {
  const { wsStatus, provider } = useWebSocketManager();
  const { document } = provider ?? {};

  const editorInstance = useEditor(wsStatus === ConnectionStatus.CONNECTED, document, provider);

  // useEffect(() => {
  //   try {
  //     editorInstance.value?.chain().focus().setTextSelection({ from: 1, to: 4 }).run();
  //     editorInstance.value?.chain().focus().run();
  //   } catch (error) {
  //     console.error(error);
  //     // throw new Error(error);
  //   }
  // }, [status]);

  return (
    <div className='editor'>
      {wsStatus === ConnectionStatus.CONNECTED && (
        <>
          <EditorContent className='editor bg-white' editor={editorInstance.value} />
          <MenuBar editor={editorInstance.value} />
        </>
      )}
    </div>
  );
}

export default Tiptap;
