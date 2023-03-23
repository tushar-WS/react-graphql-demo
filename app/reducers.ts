/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import languageProvider from '@containers/LanguageProvider/reducer';
import home from '@containers/HomeContainer/reducer';
import launchDetails from '@containers/LaunchDetails/reducer';
import SongContainer from '@containers/SongContainer/reducer';
import SongDetailContainer from '@containers/SongDetailContainer/reducer';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducer = {}) {
  const rootReducer = combineReducers({
    ...injectedReducer,
    languageProvider,
    home,
    launchDetails,
    SongContainer,
    SongDetailContainer
  });

  return rootReducer;
}
