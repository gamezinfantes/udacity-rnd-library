
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import { BookShelf } from '../components'


export default class SearchPage extends Component {
  state = {
    query: "",
    books: []
  }

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired
  }

  onChangeQuery = (event) => {
    this.setState({ query: event.target.value });

    BooksAPI.search(event.target.value).then(books => {
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text"
              onChange={this.onChangeQuery}
              placeholder="Search by title or author"
              value={this.state.query} />

          </div>
        </div>
        <div className="search-books-results">
          <BookShelf
            books={this.state.books}
            onChangeShelf={this.props.onChangeShelf} />
        </div>
      </div>
    )
  }
}
