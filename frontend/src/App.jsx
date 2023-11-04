import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import MoviesList from './components/MoviesList';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<MoviesList />} />
      </Routes>
    </Router>
  );
}

export default App;
