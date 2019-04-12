import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './Navbar/Navbar';
import { MessagesListing } from './Message/List';
import { HomeComponent } from './Home/Home';
import './App.scss';
import { UsersListing } from './User/List';
import { Profile } from './User/Profile';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/profile" exact component={localStorage.getItem('chatApp') ? Profile : HomeComponent} />
            <Route path="/messages/" exact component={localStorage.getItem('chatApp') ? MessagesListing : HomeComponent} />
            <Route path="/users/" exact component={localStorage.getItem('chatApp') ? UsersListing : HomeComponent} />
            <Route path="/*" exact component={HomeComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
