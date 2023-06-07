import './App.css';
import './index.css';
import Routers from './routes';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='editor__header' />
        <Routers />
      </header>
    </div>
  );
}

export default App;
