import React from 'react'
import './App.css'
import Home from './containers/Home'
import SearchPage from './containers/SearchPage'
import { BrowserRouter, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import groupBy from 'lodash/groupBy'


class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  groupIntoShelfs(books) {
    return groupBy(books, "shelf");
  }

  onChangeShelf = (bookId, shelf) => {
    const book = this.state.books.find(b => b.id === bookId);
    if(book){
      this.addOrUpdateBook({
        ...book,
        shelf,
      });
      
      BooksAPI.update(
        { id: bookId },
        shelf,
      )
    } else {
      BooksAPI.get(bookId).then(book => {
        this.addOrUpdateBook({
          ...book,
          shelf
        })
      })
      .then(() => {
        BooksAPI.update(
          { id: bookId },
          shelf,
        )
      });
    }
  }

  addOrUpdateBook(book) {
    this.setState(state => {
      if(book.shelf === "none") {
        return {
          books: state.books.filter(b => b.id !== book.id)
        };
      }

      const index = state.books.findIndex(b => b.id === book.id);
      if (index > -1) {
        state.books[index] = book;
      } else {
        state.books.push(book);
      }

      return {
        books: state.books
      };
    })
  }
  
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route exact path="/" render={() => (
              <Home
                shelfs={this.groupIntoShelfs(this.state.books)}
                onChangeShelf={this.onChangeShelf} />
            )} />
            <Route exact path="/search" render={() => (
              <SearchPage
                onChangeShelf={this.onChangeShelf}
                myBooks={this.state.books} />
            )}/>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
