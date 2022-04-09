import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpense() {
    const { expenses } = this.props;
    const mapExpenses = expenses.map((element) => element);
    const total = mapExpenses.reduce((acc, cur) => acc + cur.value
    * (Object.values(cur.exchangeRates)
      .find((element) => element.code === cur.currency).ask), 0);
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ this.totalExpense() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>);
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
