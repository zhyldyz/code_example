import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import translationsPage from './translations-page';

export default combineReducers({
  routing,
  translationsPage,
})