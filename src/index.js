import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Root from "./containers/Root";
import configureStore from "./store";
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory } from "react-router";
import 'bootstrap/dist/css/bootstrap.css';
import { fetchTranslation } from "./actions/translations-page";
import { BASE_URL } from "./config";

const store = configureStore();
const eventSource = new EventSource(`${BASE_URL}/stream`, {
  withCredentials: true
});
eventSource.addEventListener('translations', function (e) {
  const eventData = JSON.parse(e.data);
  store.dispatch(fetchTranslation(eventData.id));
});
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Root store={store} history={history}/>, document.getElementById('root'));

registerServiceWorker();
