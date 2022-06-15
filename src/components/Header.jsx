import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.catchUser();
  }

  catchUser = async () => {
    this.setState({
      loading: true,
    });
    const userName = await getUser();
    this.setState({
      loading: false,
      user: userName,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component" >
        <h1 className="header-title">TrybeTunes</h1>
        {loading && <Loading />}
        <h2 data-testid="header-user-name" className="user-name">{user.name}</h2>
          <div className="header-mother">
            <div className="link-container">
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              <Link to="/profile" data-testid="link-to-profile">User Profile</Link>
            </div>
          </div>
      </header>
    );
  }
}

export default Header;
