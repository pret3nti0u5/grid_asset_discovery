import React from 'react';
import { connect } from 'react-redux';
import {
  fuzzySearchAssets,
  searchAssets,
  clearAssets,
} from '../actions/assetsActions';
import Spinner from './Spinner';

class SearchPage extends React.Component {
  state = {
    term: '',
    searchType: 'hostname',
    fuzzySearch: false,
    firstRender: true,
  };

  fuzzySearch(e) {
    e.preventDefault();
    this.setState({ firstRender: false });
    this.props.fuzzySearchAssets(this.state.term);
  }

  search(e) {
    e.preventDefault();
    this.setState({ firstRender: false });
    this.props.searchAssets(this.state.term, this.state.searchType);
  }

  componentWillUnmount() {
    this.props.clearAssets();
  }

  renderItems() {
    if (this.props.isLoading) {
      return <Spinner />;
    }
    if (!this.props.assets) {
      return;
    }
    if (
      this.props.assets.length !== 0 &&
      !this.props.assets[0].hasOwnProperty('_source')
    ) {
      return;
    }

    if (this.props.assets.length === 0 && !this.state.firstRender) {
      return <div className='title'>No Results Found!</div>;
    }

    const assetArr = this.props.assets.map((asset, index) => {
      const { hostname, ip, mac, domain_address, os, workgroup, lastSeen } =
        asset._source;
      return (
        <div className='column is-one-quarter is-narrow' key={index}>
          <div className='card'>
            <header className='card-header'>
              <p className='card-header-title'>{ip}</p>
            </header>
            <div className='card-content'>
              <p>
                <span className='is-size-6 has-text-weight-semibold'>IP: </span>{' '}
                <span className='is-size-6'>{ip}</span>
              </p>
              <p>
                <span className='is-size-6 has-text-weight-semibold'>
                  HOSTNAME:{' '}
                </span>{' '}
                <span className='is-size-6'>{hostname}</span>
              </p>
              <p>
                <span className='is-size-6 has-text-weight-semibold'>
                  MAC:{' '}
                </span>{' '}
                <span className='is-size-6'>{mac}</span>
              </p>
              <p>
                <span className='is-size-6 has-text-weight-semibold'>
                  DOMAIN:{' '}
                </span>{' '}
                <span className='is-size-6'>{domain_address}</span>
              </p>
              <p>
                <span className='is-size-6 has-text-weight-semibold'>OS: </span>{' '}
                <span className='is-size-6'>{os}</span>
              </p>
              <p>
                <span className='is-size-6 has-text-weight-semibold'>
                  WORKGROUP:{' '}
                </span>{' '}
                <span className='is-size-6'>{workgroup}</span>
              </p>
              <p>
                <span className='is-size-6 has-text-weight-semibold'>
                  LAST SEEN:{' '}
                </span>{' '}
                <span className='is-size-6'>{lastSeen}</span>
              </p>
            </div>
          </div>
        </div>
      );
    });
    return assetArr;
  }

  renderSearch() {
    if (this.state.fuzzySearch) {
      return (
        <form onSubmit={(e) => this.fuzzySearch(e)}>
          <div className='field is-grouped'>
            <div className='control is-expanded'>
              <input
                type='text'
                className='input'
                value={this.state.term}
                onChange={(e) => this.setState({ term: e.target.value })}
              />
            </div>
            <div className='control'>
              <button className='button is-primary'>Search</button>
            </div>
          </div>
        </form>
      );
    }

    return (
      <form onSubmit={(e) => this.search(e)}>
        <div className='field has-addons'>
          <div className='control'>
            <span className='select is-rounded'>
              <select
                value={this.state.searchType}
                onChange={(e) => {
                  this.setState({ searchType: e.target.value });
                }}>
                <option value='hostname'>Hostname</option>
                <option value='ip'>IP Address</option>
                <option value='mac'>MAC Address</option>
                <option value='domain_address'>Domain Address</option>
                <option value='os'>OS</option>
                <option value='workgroup'>Workgroup</option>
                <option value='lastSeen'>Last Seen</option>
              </select>
            </span>
          </div>
          <div className='control is-expanded'>
            <input
              type='text'
              className='input'
              value={this.state.term}
              onChange={(e) => this.setState({ term: e.target.value })}
            />
          </div>
          <div className='control'>
            <button className='button is-primary is-rounded'>Search</button>
          </div>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div className='container'>
        <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-bold mt-2 poppins-font'>
          Search Indexed Devices
        </h1>
        <div className='section'>
          {this.renderSearch()}
          <label className='checkbox ml-4'>
            <input
              type='checkbox'
              className='mr-2 mt-3'
              checked={this.state.fuzzySearch}
              onChange={(e) => {
                this.setState({ fuzzySearch: !this.state.fuzzySearch });
              }}
            />
            Fuzzy Search
          </label>
        </div>
        <div className='columns is-centered is-multiline'>
          {this.renderItems()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assets: state.assets.assets,
    isLoading: state.assets.loading,
  };
};

export default connect(mapStateToProps, {
  fuzzySearchAssets,
  searchAssets,
  clearAssets,
})(SearchPage);
