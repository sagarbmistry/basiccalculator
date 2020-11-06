import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter,
} from "react-router-dom";
import './App.css';

import Home from './pages/home'
import NotFound from "./pages/notfound";

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

const Layout = withRouter(({ location }) => {
  return (
    <Router>
          <main  id="container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/">
                <Redirect to="/"/>
              </Route>
              <Route path="" component={NotFound} />
            </Switch>
          </main>
    </Router>
  );
});

export default App;