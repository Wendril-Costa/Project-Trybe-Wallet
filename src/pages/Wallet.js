import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount = async () => {
    const { dispatchFetch } = this.props;
    await dispatchFetch();
  };

  render() {
    return (
      <div>
        <h1>TrybeWallet</h1>
        <Header />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFetch: () => dispatch(fetchCurrencies()) });

Wallet.propTypes = {
  dispatchFetch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
