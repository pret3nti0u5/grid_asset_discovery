import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import ScanPage from './ScanPage';
import SearchPage from './SearchPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='app'>
          <Navbar />
          <Switch>
            <Route path='/' exact>
              <HomePage />
            </Route>
            <Route path='/scan' exact>
              <ScanPage />
            </Route>
            <Route path='/search' exact>
              <SearchPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
