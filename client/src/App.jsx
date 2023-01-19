import { Routes, Route } from 'react-router-dom';

// --- Components --- //
import Header from './components/Header';
import Particle from './components/Particle';

// --- Pages --- //
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className='font-app'>
      {/* <Particle /> */}
      <Header title='PrismaVision' />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
