import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import About from './components/About';
import Navigation from './components/Navigation';
import login from './components/login';

class App extends Component {
  state = {}
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation/>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/login" component={login} />
          </Switch>
        </div>
      </BrowserRouter>


    );
  }
}

export default App;


