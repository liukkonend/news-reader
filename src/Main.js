import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from './Home';
import Search from './Search';
import StoryDetails from './StoryDetails';

class Main extends Component {
  render() {
    return (
        <Switch>
            <Route path="/top/:section" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/story/:url" component={StoryDetails} />
            <Route render={() => <h1>Page not found</h1>} />
        </Switch>
    );
  }
}

export default withRouter(Main);
