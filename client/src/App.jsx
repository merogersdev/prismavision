import { Routes, Route } from 'react-router-dom';

// --- Components --- //
import Header from './components/Header';
import Particle from './components/Particle';
import Toast from './components/Toast';

// --- Pages --- //
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className='font-app'>
      {/* <Particle /> */}
      <Header title='PrismaVision' />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toast />
    </div>
  );
}
