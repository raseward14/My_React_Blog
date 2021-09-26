import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ArticlesList from './pages/ArticlesList';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';

import NavBar from './NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id='page-body'>
          <Route path='/' component={HomePage} exact />
          {/* <HomePage /> */}
          <Route path='/articles' component={ArticlesList} />
          <Route path='/about' component={AboutPage} />
          <Route path='/article/:name' component={ArticlePage} />
        </div>
      </div>
    </Router>

  );
};

export default App;
