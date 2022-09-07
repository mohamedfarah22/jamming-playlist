
const redirectUrl = "http://localhost:3000/"
//const redirectUrl = "https://spotifysearchandplaylistcreation.surge.sh/";
const clientID = "b19b9f4de3ce4a5a9e5a46a10894df45";
let accessToken;
const Spotify={
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }
       const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
       const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn= Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }else{
            window.location=`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
        }
    },

  async search(term){
    
   const accessToken = Spotify.getAccessToken();
   
   return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,  {headers : {Authorization : `Bearer ${accessToken}` }
}).then(response => {
        return response.json()
   }).then(jsonResponse => {
    
    if(!jsonResponse.tracks){
        return [];
    } else{
        return jsonResponse.tracks.items.map(track => ({
            id: track.id, name : track.name, artist: track.artists[0].name, album: track.album.name, uri: track.uri
        }));
       
    }

   });

    
},
async savePlaylist(name, trackUris){
    if(!name || !trackUris){
        return;

    }
    let accessToken=Spotify.getAccessToken();
    
    
    let userId;
     return fetch(`https://api.spotify.com/v1/me`,{headers: {Authorization: `Bearer ${accessToken}`}}).then((response) =>
         response.json()
         ).then( jsonResponse => {
        
        userId = jsonResponse.id;
        return fetch (`https://api.spotify.com/v1/users/${userId}/playlists`, 
        {headers: {Authorization : `Bearer ${accessToken}`}, 
        method: `POST`, 
        body: JSON.stringify({name: name})
    })}).then(response => 
           response.json()
        ).then(jsonResponse =>{
            const playlistID=jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {headers: {Authorization : `Bearer ${accessToken}`}, method: `POST`, body: JSON.stringify({uris: trackUris})})
        }).catch(error =>{
            console.log(error)

        })
       
    },

    async searchTrackAudio(trackIds){
        if(!trackIds){
            return;
        }
        const accessToken = Spotify.getAccessToken();
       let searchTrackIds= trackIds.join(',')
        return fetch(`https://api.spotify.com/v1/tracks?ids=${searchTrackIds}`,  {headers: {Authorization : `Bearer ${accessToken}`}, method: 'GET'} 
        ).then( (response) => response.json()
        ).then(jsonResponse =>{
            if(!jsonResponse){
                return "Preview Sound Unavailable"
            }else{
                return jsonResponse.tracks.map(track=>({
                    previewUrl: track.preview_url

                }))
            }
        })
    }
  
    

}



export default Spotify;