import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../actions';

class Login extends Component {
  state={
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.enableButton);
  };

  enableButton = () => {
    const { email, password } = this.state;
    const validEmail = /\S+@\S+\.\S+/;
    const passMin = 6;
    if (password.length >= passMin && validEmail.test(email)) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  render() {
    const { isDisabled, password, email } = this.state;
    const { add } = this.props;
    return (
      <div>
        <h1>Hello, TrybeWallet!</h1>
        <h2>Login</h2>
        <div>
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </label>
          <Link to="/carteira">
            <input
              id="button"
              name="button"
              type="button"
              value="Entrar"
              disabled={ isDisabled }
              onClick={ () => add(email) }
            />
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (email) => dispatch(addEmail(email)) });

Login.propTypes = {
  add: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
