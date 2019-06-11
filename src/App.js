import React from 'react';
import { Route, HashRouter } from 'react-router-dom';

import Home from './components/Home';
import ShortToLongUrl from './components/ShortToLongUrl';

const App = () => {
  return (
    <HashRouter>
      <Route exact path="/" component={Home} />
      <Route
        path="/:shortUrlPath"
        render={({ match }) => (
          <ShortToLongUrl shortUrlPath={match.params.shortUrlPath} />
        )}
      />
    </HashRouter>
  );
};

export default App;
