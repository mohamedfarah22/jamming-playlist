import "./SearchBar.css";
import React from "react";


class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this);
        this.state={
            term:''
        }
    }
    handleTermChange(event){
        this.setState({term:event.target.value})
    }
    search(){
        this.props.onSearch(this.state.term)
    }
    render(){
        return(
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <button onClick={this.search} className="SearchButton">SEARCH</button>
            </div>
        )
    }

}
 export default SearchBar;