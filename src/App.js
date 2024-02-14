import './App.css';
import { Modal } from "./components/components"
import { AppProvider } from './Context/Context';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Modal />
      </div>
    </AppProvider>
  );
}

export default App;
