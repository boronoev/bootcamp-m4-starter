import React, { Component } from 'react';
import './MovieItem.css';

class MovieItem extends Component {


  render() {
    const { Title: title, Year: year, Poster: poster, imdbID } = this.props;
    return (
      <article className="movie-item">
        <img className="movie-item__poster" src={poster} alt={title} />
        <div className="movie-item__info">
          <h3 className="movie-item__title">{title}&nbsp;({year})</h3>
          <button type="button" className="movie-item__add-button" onClick={() => this.props.onAddClick(imdbID, title, year)}>Добавить в список</button>
        </div>
      </article>
    );
  }
}

export default MovieItem;
