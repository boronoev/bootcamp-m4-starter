import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
  state = {
    searchLine: ''
  }
  searchLineChangeHandler = (e) => {
    this.setState({ searchLine: e.target.value });
  }



  render() {
    const { searchLine } = this.state;

    return (
      <div className="search-box">
        <form className="search-box__form" onSubmit={this.props.searchBoxSubmitHandler}>
          <label className="search-box__form-label">
            Искать фильм по названию:
            <input
              value={searchLine}
              type="text"
              name='value'
              className="search-box__form-input"
              placeholder="Например, Shawshank Redemption"
              onChange={this.searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            disabled={!searchLine}
          >
            Искать
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBox;
