import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Destination from './components/Destination';

class App extends Component {
  state = {}
  render() {
    return (
      <BrowserRouter>
        <div>
          <Destination />
        </div>
      </BrowserRouter>


    );
  }
}

export default App;


