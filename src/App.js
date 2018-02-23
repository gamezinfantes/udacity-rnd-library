import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Home from './containers/Home'
import SearchPage from './containers/SearchPage'
import { BrowserRouter, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    }); 
  }
  
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route exact path="/" render={() => (
                <Home books={this.state.books}/>
            )} />
            <Route exact path="/search" component={SearchPage} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
