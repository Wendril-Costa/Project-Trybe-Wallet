import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
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
        </thead>
        <tbody>
          {expenses.map(({
            id,
            description,
            tag,
            method,
            value,
            exchangeRates,
            currency,
          }) => (
            <tr key={ id }>
              <td>
                { description }
              </td>
              <td>
                { tag }
              </td>
              <td>
                { method }
              </td>
              <td>
                { Number(value).toFixed(2) }
              </td>
              <td>
                { exchangeRates[currency].name }
              </td>
              <td>
                { Number(exchangeRates[currency].ask).toFixed(2) }
              </td>
              <td>
                { (Number(exchangeRates[currency].ask) * Number(value)).toFixed(2) }
              </td>
              <td>
                Real
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Table);
