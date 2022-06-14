import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

// lógica de código inspirada no componente Login.
class Search extends React.Component {
  constructor() {
    super();
    // console.log(this);
    this.state = {
      buttonDisabled: true,
      searchText: '',
      loading: false,
      albuns: '',
      artist: '', // necessário somente para exibir o nome
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
    // console.log(value);
  }

  handleButtonSearch = async () => {
    const { searchText } = this.state;
    this.setState({
      loading: true,
      artist: searchText,
    });
    // chama a função
    const album = await searchAlbumsAPI(searchText);
    // console.log(album);
    this.setState({
      loading: false,
      albuns: album,
      searchText: '',
    });
    // console.log(this.state);
  }

  render() {
    const { buttonDisabled, searchText, loading, artist, albuns } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        { loading ? (<Loading />) : ( // necessário para somente exibir o form caso loading true.
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
          ? (albuns.map((album, index) => ( // index por causa de lint
            <div key={ index }>
              {/* {console.log(album.artistName)} */}
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
                to={ `/album/${album.collectionId}` } // pega o id e coloca no fim da url
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
