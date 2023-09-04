import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import MainPage from './Components/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/MainPage" element={<MainPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
