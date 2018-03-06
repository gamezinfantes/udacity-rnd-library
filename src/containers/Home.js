import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BookShelf } from '../components'


export default class Home extends Component {
  static propTypes = {
    shelfs: PropTypes.object.isRequired,
  }

  render() {
    const { shelfs } = this.props;
    return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          { Object.entries(shelfs).map(([shelfKey, books]) => (
            <BookShelf
              books={books}
              key={shelfKey}
              onChangeShelf={this.props.onChangeShelf}
              title={shelfKey} />
          ))}
        </div>
      </div>
      <div className="open-search">
        <a href="/search">Add a book</a>
      </div>
    </div>
    )
  }
}

