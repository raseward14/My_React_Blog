import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ArticlesListPage from './pages/ArticlesListPage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

import NavBar from './NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id='page-body'>
          <Switch>
          <Route path='/' component={HomePage} exact />
          {/* <HomePage /> */}
          <Route path='/articles-list' component={ArticlesListPage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/article/:name' component={ArticlePage} />
          <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>

  );
};

export default App;
