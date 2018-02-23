import React, { Component } from 'react'
import PropTypes from 'prop-types'


const Book = (props) => {
  const onChangeStatus = (event) => {
    props.onChangeStatus && props.onChangeStatus(event.target.value);
  };

  return (
    <li className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${props.cover})` }}></div>
        <div className="book-shelf-changer">
          <select onChange={onChangeStatus}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{ props.title }</div>
      { props.author && (
        <div className="book-authors">{ props.author }</div>
      )}
    </li>
  ) 
}

Book.propTypes = {
  author: PropTypes.string,
  cover: PropTypes.string.isRequired,
  onChangeStatus: PropTypes.func,
  title: PropTypes.string.isRequired,
}

export default Book
