import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ModelDetail from './pages/ModelDetail';
import {About} from "@/pages/About.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/model/:id" element={<ModelDetail/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </Router>
    );
}

export default App;
