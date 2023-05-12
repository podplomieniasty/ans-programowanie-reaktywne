import './App.css';
import Posts from './components/Posts/Posts';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
