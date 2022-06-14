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
    }; // estado inicial
  }

  // desconstroi target de event
  handleChange = ({ target }) => {
    const { name, value } = target; // desconstroi name e value do target(elemento acionador do evento)
    this.setState({
      [name]: value,
    }, () => this.verifyUserLength());
    // console.log('teste handlechange', name, value);
    // console.log(this);
  };// setState é assincrono, depois que ele roda, chama uma função para verificar se o comprimento é maior que 3.
  // a arrow function é para só rodar depois do segundo parametro atualizar!!

  // ref monitoria Carlos
  // na função abaixo, o loading só fica true enquanto o dado n vem da API;
  handleButton = async () => {
    const { loginName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: loginName });
    this.setState({
      redirect: true, // para redirecionar para a pagina search
    });
  }

  verifyUserLength = () => {
    // console.log('testeverify');
    const { loginName } = this.state;
    const minLength = 3;
    if (loginName.length >= minLength) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
    /* (loginName.length >= minLength)
      ? this.setState({ disabled: false })
      : this.setState({ disabled: true }); */
  }

  render() {
    const { disabled, loginName, redirect, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <h1>Login</h1>
          <input
            data-testid="login-name-input"
            type="text"
            name="loginName"
            value={ loginName }
            onChange={ this.handleChange }
            placeholder="nome do usuário"
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ disabled }
            onClick={ this.handleButton }
          >
            Entrar
          </button>

          {loading && <Loading />}
          {redirect && <Redirect to="/search" />}

        </form>
      </div>

    // linhas 64 e 65, se loading e redirect forem true, eles serão renderizados na tela.
    );
  }
}

export default Login;
