import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';

import store from './redux/store';
import Home from './containers/Home';
import CobaFirebase from './containers/CobaFirebase';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Home />
        </div>
      </Provider>
    );
  }
}

export default App;
