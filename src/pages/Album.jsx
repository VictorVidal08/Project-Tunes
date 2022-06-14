import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

// codigo realizado com ajuda do takashi.

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artist: '',
      album: '',
      loading: false,
    };
  }

  async componentDidMount() {
    // console.log(this.props);
    const { match: { params: { id } } } = this.props;
    // console.log(id);
    this.handlerGetMusics(id);
  }

   handlerGetMusics = async (id) => {
     const musics = await getMusics(id);
     console.log(musics);
     const { artistName, collectionName } = musics[0]; // para pegar o nome do artista e album na primeira posição do array musics;
     this.setState({
       artist: artistName,
       album: collectionName,
     });
     const albumSongs = musics.slice(1); // retira o primeiro item da lista(que são informações sobre o album...)
     // console.log(albumSongs);
     this.setState({
       musics: albumSongs,
     });
   };

   render() {
     const { artist, album, musics, loading } = this.state;
     return (
       <div data-testid="page-album">
         Album
         <Header />
         { loading && (<Loading />)}
         <h2 data-testid="album-name">{ album }</h2>
         <h3 data-testid="artist-name">{ artist }</h3>
         { musics.map((song, index) => (
           <MusicCard
             key={ index }
             trackName={ song.trackName }
             previewUrl={ song.previewUrl }
             trackId={ song.trackId }
             song={ song } // passando a musica como prop para musicCard
           />
         ))}
       </div>
     );
   }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired, // proptypes.shape define o formato do objeto. ref https://dev.to/cesareferrari/how-to-specify-the-shape-of-an-object-with-proptypes-3c56
};

export default Album;
