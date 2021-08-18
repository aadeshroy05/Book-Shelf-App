import React from 'react'
import MyRead from './MyRead'
import Search from './Search'
import Route from './Route'

class BooksApp extends React.Component {

  render() {
    return (
      <div>
        <Route path="/">
          <MyRead />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </div>
    )
  }
}

export default BooksApp
