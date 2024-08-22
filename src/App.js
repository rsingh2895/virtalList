// import './App.css';
import VirtualizedList from './Components/virtual';
import { DataProvider } from '../src/Context/DataContext';

function App() {
  return (
    <DataProvider>
      <VirtualizedList />
    </DataProvider>

  );
}

export default App;
