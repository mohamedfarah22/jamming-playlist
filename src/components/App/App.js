import './App.css';
import React from 'react';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from '../../util/spotify';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={searchResults:[{name: 'Hallucinating', artist: 'Future', album: 'HNDRXX', id:1}, {name: 'GOD DID', artist: 'DJ Khaled', album: 'GOD DID', id:2}, {name: 'The Neverending Story', artist: 'Jay Electronica', album: 'A Written Testimony', id:3}], playlistName: "Fire", playlistTracks: [{name:'Blue Chills', artist: "French Montana", album: "Montega", id: 4 }]}
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatedPlaylistName = this.updatedPlaylistName.bind(this)  
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this)
  }
  removeTrack(track){
    let tracks = this.state.playlistTracks;
    let removedTrack = tracks.filter(el => el.id === track.id);
    let removedTrackIndex= tracks.indexOf(removedTrack);
    tracks.splice(removedTrackIndex, 1);
    this.setState({playlist: tracks});


  }
  addTrack(track){
    let tracks = this.state.playlistTracks;
   if(tracks.find(el => el.id === track.id)){
        return;
      }
    tracks.push(track)
    this.setState({playlistTracks : tracks})


  }
  updatedPlaylistName(name){
    this.setState({ playlistName: name })
  }
  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() =>{
      this.setState({playlistName: 'New Playlist'}, {playlistTracks: []})

    })
  }
  search(Term){
    Spotify.search(Term).then(Results => {
      this.setState({searchResults: Results})
    })
    ;

  }
  
  render(){
   return( <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
     <SearchBar onSearch = {this.search}/>
    <div className="App-playlist">
      <SearchResults onAdd= {this.addTrack} searchResults = {this.state.searchResults} />
      <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove = {this.removeTrack} onNameChange = {this.updatedPlaylistName} onSave={this.savePlaylist}/>
    </div>
  </div>
</div>
   )
  }
}



export default App;
