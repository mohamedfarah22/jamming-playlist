import React from 'react';
import './TrackList.css';
import "../Track/Track";
import Track from "../Track/Track";

class TrackList extends React.Component{
   
    render(){
        if(this.props.tracks){
            var myList = this.props.tracks.map(track => {
                return <Track onAdd={this.props.onAdd} track={track} id={track.id} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
            })
        }
        return(
            <div className="TrackList" >
              {myList}
            </div>
        )
    }

}
export default TrackList;