import React from 'react';
import App from "./components/App";
import { IndexRoute, Route } from "react-router";
import TranslationsPage from "./containers/TranslationsPage.container";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TranslationsPage} />
  </Route>
)