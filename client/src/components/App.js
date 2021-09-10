import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import SearchPage from './SearchPage';

class App extends React.Component {
  // componentDidMount() {
  //   this.props.clearErrors();
  //   this.props.getUser();
  // }
  render() {
    // if (this.props.isLoading) {
    //   return <Spinner />;
    // }
    // return (
    //   <Router>
    //     <div className='app'>
    //       <Navbar />
    //       <Switch>
    //         <Route path='/' exact>
    //           {this.props.isSignedIn ? <Welcome /> : <LoginPage />}
    //         </Route>
    //         <Route path='/challenges'>
    //           {this.props.isSignedIn ? (
    //             <Challenges />
    //           ) : (
    //             <LoginPage welcomeText='solve Challenges' />
    //           )}
    //         </Route>
    //         <Route path='/leaderboards'>
    //           {this.props.isSignedIn ? (
    //             <Leaderboards />
    //           ) : (
    //             <LoginPage welcomeText='view Leaderboards' />
    //           )}
    //         </Route>
    //       </Switch>
    //     </div>
    //   </Router>
    // );
    return (
      <Router>
        <div className='app'>
          <Navbar />
          <Switch>
            <Route path='/' exact>
              <HomePage />
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
