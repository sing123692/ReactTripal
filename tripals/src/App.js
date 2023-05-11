import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoadingPage from './components/Loding';
import About from './components/About';
import Navigation from './components/Navigation';
import login from './components/login';
import register from './components/register';

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
            <Route path="/register" component={register} />
          </Switch>
          <LoadingPage />

        </div>
      </BrowserRouter>


    );
  }
}

export default App;


