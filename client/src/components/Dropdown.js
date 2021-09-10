import React from 'react';
import { connect } from 'react-redux';
import { setFilterType } from '../actions/dropdownActions';
import { getAssets } from '../actions/assetsActions';
import './Homepage.css';

class Dropdown extends React.Component {
  render() {
    return (
      <div className='assets'>
        <div className='section'>
          <div className='dropdown is-hoverable'>
            <div className='dropdown-trigger'>
              <button
                className='button'
                aria-haspopup='true'
                aria-controls='dropdown-menu'>
                <span>{`${this.props.filter}`}</span>
                <span className='icon is-small'>
                  <i className='fas fa-angle-down' aria-hidden='true'></i>
                </span>
              </button>
            </div>
            <div className='dropdown-menu' id='dropdown-menu' role='menu'>
              <div className='dropdown-content'>
                {this.props.items.map((item) => {
                  return (
                    <div
                      className='dropdown-item'
                      onClick={(e) => {
                        this.props.setFilterType(item);
                        this.props.getAssets(item.toLowerCase());
                      }}
                      key={item}>
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.dropdown.filter,
  };
};

export default connect(mapStateToProps, { setFilterType, getAssets })(Dropdown);
