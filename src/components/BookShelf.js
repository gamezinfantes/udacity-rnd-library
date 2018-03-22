import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


export default class BookShelf extends React.Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string,
    onChangeShelf: PropTypes.func.isRequired,
  }

  getAuthor = (book) => {
    if(Array.isArray(book.authors)) {
      return book.authors[0];
    }
    return "";
  }

  render() {
    const { title, onChangeShelf, books } = this.props;
  
    return (
      <div className="bookshelf">
        { title && (
          <h2 className="bookshelf-title">
            { Book.SHELFS[title] }
          </h2>
        )}
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.map(book => (
              <Book
                author={this.getAuthor(book)}
                cover={book.imageLinks ? book.imageLinks.thumbnail : null}
                id={book.id}
                onChangeShelf={onChangeShelf}
                shelf={book.shelf}
                title={book.title}
                key={book.id} />
            ))}
          </ol>
        </div>
      </div>
    )

  }
}
