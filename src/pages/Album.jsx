import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import '../album.css';
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
    const { match: { params: { id } } } = this.props;
    this.handlerGetMusics(id);
  }

   handlerGetMusics = async (id) => {
     const musics = await getMusics(id);
     console.log(musics);
     const { artistName, collectionName } = musics[0]; 
     this.setState({
       artist: artistName,
       album: collectionName,
     });
     const albumSongs = musics.slice(1); 

     this.setState({
       musics: albumSongs,
     });
   };

   render() {
     const { artist, album, musics, loading } = this.state;
     return (
       <div data-testid="page-album">
         <Header />
         { loading && (<Loading />)}
         <div className="albuns-class">
            <h2 data-testid="album-name">{ album }</h2>
            <h3 data-testid="artist-name">{ artist }</h3>
         
         { musics.map((song, index) => (
           <MusicCard
             key={ index }
             trackName={ song.trackName }
             previewUrl={ song.previewUrl }
             trackId={ song.trackId }
             song={ song }
           />
         ))}
       </div>
       </div>
     );
   }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
