import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Navbar/>
              <AppRouter/>
          </div>
      </BrowserRouter>
  );
}

export default App;
