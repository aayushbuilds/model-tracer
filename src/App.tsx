import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ModelDetail from './pages/ModelDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/model/:id" element={<ModelDetail />} />
      </Routes>
    </Router>
  );
}

export default App;