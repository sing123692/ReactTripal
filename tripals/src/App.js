import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import About from './components/About';
import Navigation from './components/Navigation';
import login from './components/login';
import register from './components/register';
import AppSessionTest from './components/SessionTest';
import Target from './components/Target';

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
            <Route path="/SessionTest" component={AppSessionTest} />
            <Route path="/Target" component={Target} />
          </Switch>

        </div>
      </BrowserRouter>


    );
  }
}

export default App;


