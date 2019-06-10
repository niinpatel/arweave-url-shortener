import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/Home';
import ShortToLongUrl from './components/ShortToLongUrl';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route
        path="/:shortUrlPath"
        render={({ match }) => (
          <ShortToLongUrl shortUrlPath={match.params.shortUrlPath} />
        )}
      />
    </BrowserRouter>
  );
};

export default App;
