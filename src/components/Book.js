import React from 'react'
import PropTypes from 'prop-types'


class ShelfSelector extends React.PureComponent { 
  static propTypes = {
    shelfs: PropTypes.object,
    activeShelf: PropTypes.string
  }
  
  onChangeSelector = (event) => {
    this.props.onChange && this.props.onChange(event.target.value);
  }

  static TICK = "✔"

  render() {
    const { shelfs, activeShelf } = this.props;

    return (
    <select value={activeShelf} onChange={this.onChangeSelector}>
      <option value="none" disabled>Move to...</option> 
      { Object.entries(shelfs).map(([key,value]) => (
        <option
          key={key}
          value={key}>
          { value }
          { activeShelf === key && " " + ShelfSelector.TICK }
        </option>
      ))}
      </select>
    );
  }
}


class Book extends React.PureComponent {
  static SHELFS = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
    none: "None"
  }

  static propTypes = {
    author: PropTypes.string,
    cover: PropTypes.string,
    onChangeShelf: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string,
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
          style={{ backgroundImage: `url(${this.props.cover})` }} />
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

export default Book
