import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    // console.log(this);
    this.catchUser();
  }

  catchUser = async () => {
    // console.log('catchuser');
    this.setState({
      loading: true,
    });
    const userName = await getUser();
    // console.log(userName); // retorna um objeto, objetivo: pegar o name desse objeto (na linha 39, dentro do h2).
    this.setState({
      loading: false,
      user: userName,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Trybetunes</h1>
        {loading && <Loading />}
        <h2 data-testid="header-user-name">{user.name}</h2>
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritxs</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
