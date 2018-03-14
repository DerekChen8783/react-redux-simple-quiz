import React, { Component } from 'react';
import './App.css';
import Home from './component/Home';
import { Provider } from "react-redux";
import store from './config/Store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Quiz</h1>
          </header>
          <Home />
        </div>
      </Provider>
    );
  }
}

export default App;
