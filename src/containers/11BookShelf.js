import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


const BookShelf = (props) => {

  const getAuthor = (book) => {
    if(Array.isArray(book.authors)) {
      return book.authors[0];
    }
    return "";
  }
  return (
    <div className="bookshelf">
      { props.title && (
        <h2 className="bookshelf-title">
          { Book.SHELFS[props.title] }
        </h2>
      )}
      <div className="bookshelf-books">
        <ol className="books-grid">
          { props.books.map(book => (
            <Book
              author={getAuthor(book)}
              cover={book.imageLinks ? book.imageLinks.thumbnail : null}
              id={book.id}
              onChangeShelf={props.onChangeShelf}
              shelf={book.shelf}
              title={book.title}
              key={book.id} />
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  onChangeShelf: PropTypes.func.isRequired,
}

export default BookShelf;
