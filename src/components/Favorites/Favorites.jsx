import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';


class Favorites extends Component {





  render() {
    return (
      <div className="favorites">
        <input value={this.props.stateFavorites.title} className="favorites__name" onChange={this.props.onChangeListInput} disabled={!this.props.stateFavorites.status ? false : true} placeholder='Введите название списка'/>
        <ul className="favorites__list">
          {this.props.stateFavorites.moviesList.map((item) => {
            return (
            <li className='favorites__item' key={item.imdbID}>{item.title} ({item.year})
              <button onClick={() => this.props.onDelete(item.imdbID)} className="favorites__delete">X</button>
            </li>);
          })}
        </ul>
        <button
          type="button"
          className={!this.props.stateFavorites.status ? ((this.props.stateFavorites.moviesList.length===0) ? 'favorites__disabled':'favorites__save' ) : 'favorites__link'}
          onClick={this.props.onShowClick} >
          {!this.props.stateFavorites.status
            ? 'Сохранить список'
            : <Link to={`/list/${this.props.stateFavorites.link}`}
            target="_blank"
            >
              Перейти к списку
            </Link>
          }
        </button>
      </div>
    );
  }
}

export default Favorites;
