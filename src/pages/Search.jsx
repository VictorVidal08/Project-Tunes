import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

// lógica de código inspirada no componente Login.
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      searchText: '',
      loading: false,
      albuns: '',
      artist: '',
    };
  }

  handleSearchChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { searchText } = this.state;
      const minSearch = 2;
      if (searchText.length >= minSearch) {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    });
  }

  handleButtonSearch = async () => {
    const { searchText } = this.state;
    this.setState({
      loading: true,
      artist: searchText,
    });
    const album = await searchAlbumsAPI(searchText);
    this.setState({
      loading: false,
      albuns: album,
      searchText: '',
    });
  }

  render() {
    const { buttonDisabled, searchText, loading, artist, albuns } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        { loading ? (<Loading />) : (
          <form>
            <input
              type="text"
              name="searchText"
              onChange={ this.handleSearchChange }
              data-testid="search-artist-input"
              value={ searchText }
            />

            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
              onClick={ this.handleButtonSearch }
            >
              Pesquisar
            </button>
          </form>
        )}

        <h2>{ `Resultado de álbuns de: ${artist}` }</h2>

        {albuns.length > 0
          ? (albuns.map((album, index) => (
            <div key={ index }>
              <img
                src={ album.artworkUrl100 }
                alt={ album.artistNameartistName }
              />
              <p>
                Album:
                { `${album.collectionName}` }
              </p>
              <p>
                Artist:
                { `${album.artistName}` }
              </p>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                See more info about album
              </Link>
            </div>
          )))
          : <h3>Nenhum álbum foi encontrado</h3>}
      </div>
    );
  }
}

export default Search;
