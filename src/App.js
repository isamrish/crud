import React from 'react';
import logo from './logo.svg';
// import { Posts } from "./features/posts/Posts"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { NavbarComponent } from "./components/Navbar";

import { PostsList } from "./features/posts/PostsList";
import { AddPost } from "./features/posts/AddPost";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { EditPostPage } from "./features/posts/EditPostPage";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPost />
                <hr />
                <PostsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/edit-post/:postId" component={EditPostPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
