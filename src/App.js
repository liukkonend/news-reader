import React, { Component } from 'react';

import './styles/App.css';

import Header from './Header';
import Nav from './Nav';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Nav />
        <Main />
      </div>
    );
  }
}

export default App;
