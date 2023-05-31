import './App.css';
import EditorContainer from './Pages/EditorContainer';
import Editor from './Pages/Editor';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <EditorContainer>
          <Editor />
        </EditorContainer>
      </header>
    </div>
  );
}

export default App;
