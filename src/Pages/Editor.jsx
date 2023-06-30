/* eslint-disable react/prop-types */
import { EditorContent } from '@tiptap/react';
import MenuBar from '../Components/MenuBar';
import { ConnectionStatus } from '../Constants';
import useEditor from '../useEditor';
import { useWebSocketContext } from '../Contexts/WebSocketContext';

function Tiptap() {
  const { status, provider } = useWebSocketContext();
  const { document } = provider ?? {};

  const editorInstance = useEditor(
    status === ConnectionStatus.CONNECTED,
    document,
    provider,
  )?.value;

  return (
    <div className='editor'>
      {status === ConnectionStatus.CONNECTED && (
        <>
          <EditorContent className='editor bg-white' editor={editorInstance} />
          <MenuBar editor={editorInstance} />
        </>
      )}
    </div>
  );
}

export default Tiptap;
