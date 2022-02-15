import React from 'react';
//import { Switch, Route } from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom'
//import { Switch } from 'react-router-dom'

import './App.css';
import login1 from './pages/login/login.jsx';


const loginPage = () => (
<div>
<h1>please login</h1>
</div>
)

const PantsPage = () => (
    <div>
    <h1> Pants PAGE</h1>
    </div>
  )

class App extends React.Component {
  render() {
  return (
    <div className="App">
      <Routes> 
      <Route exact path='/pants' element={PantsPage} />
      <Route path='/' element={login1} />
      </Routes>
    </div>
  );
}
}

export default App;
