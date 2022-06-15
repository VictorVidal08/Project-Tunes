import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      disabled: true,
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyUserLength());
  };

  handleButton = async () => {
    const { loginName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: loginName });
    this.setState({
      redirect: true,
    });
  }

  verifyUserLength = () => {
    const { loginName } = this.state;
    const minLength = 3;
    if (loginName.length >= minLength) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { disabled, loginName, redirect, loading } = this.state;
    return (
      <div>
        <h1 className="title">TrybeTunes</h1>
          <div data-testid="page-login" className="main-div">
            <form className="formClass">
              <h1 className="login-name">Login</h1>
              <input
                data-testid="login-name-input"
                type="text"
                name="loginName"
                value={ loginName }
                onChange={ this.handleChange }
                placeholder="Username"
              />
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ disabled }
                onClick={ this.handleButton }
              >
                Log in
              </button>

              {loading && <Loading />}
              {redirect && <Redirect to="/search" />}

            </form>
          </div>
      </div>
      
    );
  }
}

export default Login;
