import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Navbar from './components/navbar/Navbar';
import Background from './css/background/background';

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              {/*<Background/>*/}
              <Navbar/>
              <AppRouter/>
          </div>
      </BrowserRouter>
  );
}

export default App;
