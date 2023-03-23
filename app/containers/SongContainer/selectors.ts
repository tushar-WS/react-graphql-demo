import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

export const selectSongContainerDomain = (state: any) => state.songContainer || initialState;

export const selectItuneData = () =>
  createSelector(selectSongContainerDomain, (substate) => {
    return get(substate, 'ituneData');
  });

export const selectArtistName = () =>
  createSelector(selectSongContainerDomain, (substate) => get(substate, 'artistName'));
