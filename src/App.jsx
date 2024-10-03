import "./index.css";
import { Routes, Route } from "react-router-dom";
import CalculatorPage from "./views/Calculator";
import MainPage from "./views/Main";
import CountCharsPage from "./views/CountChars";
import CountWordsPage from "./views/CountWords";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} index />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/count-words" element={<CountWordsPage />} />
        <Route path="/count-chars" element={<CountCharsPage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
