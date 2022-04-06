import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ListPage.css';

class ListPage extends Component {
  state = {
    title: '',
    movies: []
  }

  componentDidMount(){
      fetch(`https://acb-api.algoritmika.org/api/movies/list/${document.location.pathname.slice(6)}`)
        .then(res => res.json())
        .then(async (data) => { 

          const movies = data.movies.map(async (item) => {
            const res = await fetch(`http://www.omdbapi.com/?i=${item}&apikey=19f79120`);
            return await res.json()
          })

          this.setState({
            title: data.title,
            movies: await Promise.all(movies),
          })
        })

  }

  render() {
    return (
      <div className="list-page">
        <h1 className="list-page__title">{this.state.title}</h1>
        <ul>
          {this.state.movies.map((item) => {
            return (
              <li key={item.imdbID}>
                <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank"> 
                  {item.Title} ({item.Year})
                  </a>
              </li>
              
            );
          })}
        </ul>
        {/* <Link className="backToMain" to='/'><div>Назад</div></Link> */}
      </div>
    );
  }
}

export default ListPage;
