import React from 'react';
import Categories from './components/categories'
import Subcategories from './components/Subcategories'
import Home from './components/Home'
import Header from './components/header'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
      <Header />
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path={`${'/location'}/:ids`}>
            <Categories />
          </Route>
          <Route path={`/:categoryId`}>
            <Subcategories />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
