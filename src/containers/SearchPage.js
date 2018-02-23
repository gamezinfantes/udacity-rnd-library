
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import { Book, BookShelf } from '../components'


export default class SearchPage extends Component {
  state = {
    query: "",
    books: []
  }

  onChangeQuery = (event) => {
    this.setState({ query: event.target.value });
    BooksAPI.search(event.target.value).then(books => {
      console.log(books)
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
          <BookShelf books={this.state.books} />
        </div>
      </div>
    )
  }
}
