import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';

// Local components
import Nav from './Components/Nav/Nav';
import routes from './routes';
import store from './ducks/store';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Nav />
            {routes}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
