/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Dropdown from './Dropdown';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { getAssets, clearAssets } from '../actions/assetsActions';
class HomePage extends React.Component {
  componentDidMount() {
    this.props.getAssets();
  }

  componentWillUnmount() {
    this.props.clearAssets();
  }

  renderItems() {
    const renderedChallenges = [];
    for (const [category, challenges] of Object.entries(this.props.assets)) {
      renderedChallenges.push(
        <React.Fragment key={category}>
          <h1 className='is-size-1 has-text-weight-semibold mb-4 poppins-font'>
            {`${
              !category || category === 'null' ? 'Undetected' : `${category}`
            }`}
          </h1>
          <div className='columns is-centered is-multiline'>
            {challenges.map(
              (
                { hostname, ip, mac, domain_address, os, workgroup, lastSeen },
                index
              ) => {
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
                            OS:{' '}
                          </span>{' '}
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
              }
            )}
          </div>
        </React.Fragment>
      );
    }
    return renderedChallenges;
  }

  render() {
    if (this.props.isLoading) {
      return <Spinner />;
    }
    if (this.props.filter !== 'All') {
      return (
        <div className='container'>
          <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-bold mt-2 poppins-font'>
            Saved Assets
          </h1>
          <Dropdown items={['All', 'OS', 'Domain', 'Workgroup']} />
          <div className='container'>{this.renderItems()}</div>
        </div>
      );
    }
    return (
      <div className='container'>
        <h1 className='is-size-1 has-text-centered is-uppercase has-text-weight-bold mt-2 poppins-font'>
          Saved Assets
        </h1>
        <Dropdown items={['All', 'OS', 'Domain', 'Workgroup']} />
        <div className='container'>
          <div className='columns is-centered is-multiline'>
            {this.props.assets.map(
              (
                { hostname, ip, mac, domain_address, os, workgroup, lastSeen },
                index
              ) => {
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
                            OS:{' '}
                          </span>{' '}
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
              }
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.dropdown.filter,
    assets: state.assets.assets,
    isLoading: state.assets.loading,
  };
};

export default connect(mapStateToProps, { getAssets, clearAssets })(HomePage);
