import React from 'react';
import { connect } from 'react-redux';
import { getAssetsBySubnet, clearAssets } from '../actions/assetsActions';
import Spinner from './Spinner';

class SearchPage extends React.Component {
  state = { subnet: '' };

  componentDidMount() {
    this.props.clearAssets();
  }

  getAssets(e) {
    e.preventDefault();
    console.log('called');
    this.props.getAssetsBySubnet(this.state.subnet);
  }

  renderItems() {
    if (this.props.isLoading) {
      return <Spinner />;
    }
    if (!this.props.assets) {
      return;
    }
    const assetArr = this.props.assets.map(
      ({ hostname, ip, mac, domain_address, workgroup, lastSeen }, index) => {
        return (
          <div className='column is-one-quarter is-narrow' key={index}>
            <div className='card'>
              <header className='card-header'>
                <p className='card-header-title'>{ip}</p>
              </header>
              <div className='card-content'>
                <p>
                  <span className='is-size-6 has-text-weight-semibold'>
                    IP:{' '}
                  </span>{' '}
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
      }
    );
    return assetArr;
  }

  render() {
    return (
      <div className='container'>
        <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-bold mt-2 poppins-font'>
          Search By Subnet
        </h1>
        <div className='section'>
          <form onSubmit={(e) => this.getAssets(e)}>
            <label class='label is-size-5'>Subnet</label>
            <div class='field is-grouped'>
              <div class='control'>
                <input
                  class='input is-primary'
                  type='text'
                  value={this.state.subnet}
                  placeholder='e.g 192.168.1.0/24'
                  onChange={(e) => this.setState({ subnet: e.target.value })}
                />
              </div>
              <div className='control'>
                <button className='button is-primary'>Search</button>
              </div>
            </div>
          </form>
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

export default connect(mapStateToProps, { getAssetsBySubnet, clearAssets })(
  SearchPage
);
