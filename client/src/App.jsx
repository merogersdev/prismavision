import Header from './components/Header/Header';

function App() {
  return (
    <div className='font-app'>
      <Header />
      <form className='form'>
        <input className='form__input' placeholder='derp' />
        Message: {import.meta.env.VITE_SERVER_URL}
      </form>
    </div>
  );
}

export default App;
