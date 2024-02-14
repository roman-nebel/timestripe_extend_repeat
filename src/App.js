import './App.css';
import { Modal } from "./components/components"
import { AppProvider, AppContext } from './Context/Context';
import { useContext } from "react";

function RuleDisplay() {
  const { appState } = useContext(AppContext);
  return(
    <div className='previewContainer'>
      <span>{appState?.recurrence?.rule || "No rule"}</span>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Modal />
        <RuleDisplay />
      </div>
    </AppProvider>
  );
}

export default App;
