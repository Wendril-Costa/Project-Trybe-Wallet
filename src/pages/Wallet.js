import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addExpenses, fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  state={
    id: 0,
    value: '',
    currency: '',
    description: '',
    tag: '',
    method: '',
  }

  componentDidMount = () => {
    const { dispatchFetch } = this.props;
    dispatchFetch();
  };

  handleClick = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();
    const { dispatchExpense } = this.props;
    const { value, currency, description, tag, method } = this.state;
    let { id } = this.state;
    const payload = {
      id,
      value,
      currency,
      description,
      tag,
      method,
      exchangeRates,
    };
    dispatchExpense(payload);
    this.setState({
      id: id += 1,
      value: '',
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value, currency, description, tag, method } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <header>
          <Header />
        </header>
        <label htmlFor="value">
          Valor
          <input
            id="value"
            name="value"
            type="number"
            value={ value }
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
            value={ description }
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
            value={ currency }
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
            type="select"
            value={ method }
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
            type="select"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          id="button"
          name="button"
          type="button"
          value="Adicionar despesa"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
        <table>
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetch: () => dispatch(fetchCurrencies()),
  dispatchExpense: (payload) => dispatch(addExpenses(payload)),
});

Wallet.propTypes = {
  dispatchFetch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
