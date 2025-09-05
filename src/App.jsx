import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Quiz } from './Components/Quiz/Quiz';
import { Results } from './Components/Quiz/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" replace />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
