import React, { Component } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';

class MainPage extends Component {

  state = {
    title: 'Новый список',
    moviesList: [
      // { imdbID: 'tt0068646', title: 'The Godfather', year: 1972 }
    ],
    movies: [
      // {
      //   imdbID: 'tt3896198',
      //   Title: "Guardians of the Galaxy Vol. 2",
      //   Year: 2017,
      //   Poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"

      // },
      // {
      //   imdbID: 'tt0068646',
      //   Title: "The Godfather",
      //   Year: 1972,
      //   Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"

      // },
      // {
      //   imdbID: 'tt1431045',
      //   Title: "Deadpool",
      //   Year: 2016,
      //   Poster: "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"

      // },
      // {
      //   imdbID: 'tt6751668',
      //   Title: "Parasite",
      //   Year: 2019,
      //   Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"

      // }
    ],
    status: false,
    link: '',
  }

  onAddClick = (imdbID, title, year) => {
    const array = this.state.moviesList;
    if (array.some(item => item.imdbID === imdbID)) { return }
    const newArray = [
      ...array,
      { imdbID: imdbID, title: title, year: year }
    ];
    this.setState({ moviesList: newArray });
  };


  onChangeListInput = (event) => this.setState({ ...this.state, title: event.target.value })


  searchBoxSubmitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const loadSearch = (input) => {
      fetch(`http://www.omdbapi.com/?s=${input}&apikey=19f79120`)
        .then(res => res.json())
        .then(data => { this.setState({ movies: data.Search }) })
    }
    loadSearch(data.get('value'));
  }

  remove = (id) => {
    if (this.state.status) { return }
    this.setState({
      moviesList: this.state.moviesList.filter(item => item.imdbID !== id),
    })
  }

  onShowClick = () => {
    if (this.state.status) { return }
    if (this.state.moviesList.length===0) { return }

    const body = JSON.stringify({
      title: this.state.title,
      movies: this.state.moviesList.map((item) => { return item.imdbID })
    });

    fetch('https://acb-api.algoritmika.org/api/movies/list', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: body
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ link: `${data.id}` })
      })
      ;
    this.setState({ status: true });
  };

  render() {
    return (
      <div className="main-page">
        <Header />
        {/* <button onClick={()=>console.log(this.state)}>state</button> */}
        <main className="main-page__content">
          <section className="main-page__main-section">
            <div className="main-page__search-box">
              <SearchBox searchBoxSubmitHandler={this.searchBoxSubmitHandler} />
            </div>
            <div className="main-page__movies">
              <Movies stateMovies={this.state} onAddClick={this.onAddClick} />
            </div>
          </section>
          <aside className="main-page__favorites">
            <Favorites stateFavorites={this.state} onChangeListInput={this.onChangeListInput} onDelete={this.remove} onShowClick={this.onShowClick} />
          </aside>
        </main>
      </div>
    );
  }
}

export default MainPage;
