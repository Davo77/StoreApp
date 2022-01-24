import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Store from './Store';
import Login from './Login';
import useToken from './useToken';


function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <Store />
      <BrowserRouter>
        <Routes>
          <Route path="/store" exact component={Store} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;