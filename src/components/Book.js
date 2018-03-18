import React from 'react'
import PropTypes from 'prop-types'


const ShelfSelector = ({ shelfs, activeShelf, onChange }) => {
  const onChangeSelector = (event) => {
    onChange && onChange(event.target.value);
  }

  return (
  <select value={activeShelf} onChange={onChangeSelector}>
    <option value="none" disabled>Move to...</option> 
    { Object.entries(shelfs).map(([key,value]) => (
      <option
        key={key}
        value={key}>
        { value }
      </option>
    ))}
    </select>
  );
}


class Book extends React.Component {
  static SHELFS = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
    none: "None"
  }
  
  onChangeShelf = (value) => {
    this.props.onChangeShelf && this.props.onChangeShelf(
      this.props.id,
      value
    );
  }
  
  render = () => (
    <li className="book">
      <div className="book-top">
        <div 
          className="book-cover"
          style={{ width: 128, height: 192, backgroundImage: `url(${this.props.cover})` }} />
        <div className="book-shelf-changer">
          <ShelfSelector
            activeShelf={this.props.shelf}
            shelfs={Book.SHELFS}
            onChange={this.onChangeShelf}/>
        </div>
      </div>
      <div className="book-title">{ this.props.title }</div>
      { this.props.author && (
        <div className="book-authors">{ this.props.author }</div>
      )}
    </li>
  ) 
} 

Book.propTypes = {
  author: PropTypes.string,
  cover: PropTypes.string,
  onChangeShelf: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string,
}

export default Book
