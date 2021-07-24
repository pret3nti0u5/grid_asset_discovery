/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
// import logo from '../assets/simple-ctfd-clone-logo-navbar.png';
// const base_URI =
//   process.env.NODE_ENV === 'production'
//     ? 'https://simple-ctfd-clone.herokuapp.com'
//     : 'http://localhost:5000';

class Navbar extends React.Component {
  state = { clicked: false };

  render() {
    return (
      <nav className='navbar is-info'>
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>
            <img alt='logo' width='180' />
          </Link>
          <button
            onClick={() => this.setState({ clicked: !this.state.clicked })}
            className={`navbar-burger darkBg noBorder ${
              this.state.clicked ? 'is-active' : ''
            }`}
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </button>
        </div>
        <div className={`navbar-menu ${this.state.clicked ? 'is-active' : ''}`}>
          <div className='navbar-start'>
            <Link to='/search' className='navbar-item'>
              Search
            </Link>
          </div>
          <div className='navbar-end'>
            {/* <div className='navbar-item'>
              <div className='buttons'>{this.renderButton()}</div>
            </div> */}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
