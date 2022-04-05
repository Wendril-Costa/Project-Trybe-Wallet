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
    const { currencies } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <Header />
        <label htmlFor="value">
          Valor
          <input
            id="value"
            name="value"
            type="text"
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            id="description"
            name="description"
            type="text"
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            name="currency"
            type="select"
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {currencies.map((element, index) => (
              <option
                key={ index }
                value={ element }
              >
                {element}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          <select
            id="method"
            name="method"
            typeof="select"
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            id="tag"
            name="tag"
            typeof="select"
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="dAlimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetch: () => dispatch(fetchCurrencies()) });

Wallet.propTypes = {
  dispatchFetch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
