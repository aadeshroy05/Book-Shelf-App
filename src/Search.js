import React, { Component } from 'react'
import './App.css'
import { search, update } from './BooksAPI'

export default class Search extends Component {

    state = {
        term: '',
        books: [],
        shelf: '',

    }

    componentDidMount() {
        this.getBooks('fitness');
    }

    onInputChange = (e) => {
        this.setState({
            term: e.target.value
        })
    }

    getBooks = async (term) => {
        try {
            const res = await search(term);
            console.log("From Search response = ", res);
            if (!res.error) {
                this.setState({ books: res });
            } else {
                this.setState({ books: [] }, () => {
                    alert(`${term} Books Not Found! `);
                });

            }
        } catch (error) {
            console.log(error)
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.getBooks(this.state.term);
    }

    updateBook = async (book) => {
        try {
            console.log("shelf = ", this.state.shelf);
            const res = await update(book, this.state.shelf);
            this.setState({ shelf: '' })
            // this.getBooks();
            console.log(res);
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return (
            <div className="container">
                <div className="search-bar ui segment">
                    <form onSubmit={this.onFormSubmit} className="ui form">
                        <div className="ui fluid action input">
                            <input
                                placeholder="Seach book by Book name"
                                type="text"
                                value={this.state.term}
                                onChange={this.onInputChange}

                            />
                            <button className="ui button" onSubmit={this.onFormSubmit}>Search</button>
                        </div>

                    </form>

                    <div className="bookshelf">
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {this.state.books.map(book =>
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover"
                                                    style={{
                                                        width: 128, height: 193,
                                                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                                    }}
                                                ></div>
                                                <div className="book-shelf-changer">
                                                    <select value={this.state.shelf}
                                                        onChange={(e) => {
                                                            this.setState({ shelf: e.target.value }, () => {
                                                                this.updateBook(book)
                                                            })
                                                        }}
                                                    >
                                                        <option value="move" disabled>Move to...</option>
                                                        <option value="" style={{ visibility: 'hidden', display: 'none' }}></option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors}</div>
                                        </div>
                                    </li>)}
                            </ol>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}
