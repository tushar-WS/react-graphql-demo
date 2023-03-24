import { call, put } from 'redux-saga/effects';
import { getItuneSongs } from '../saga';
import { requestGetItuneSongs, successGetItuneSongs } from '../reducer';
import { getItunes } from '@app/services/ituneApi';

describe('songContainerSaga tests', () => {
  const generator = getItuneSongs({ type: requestGetItuneSongs.toString(), payload: 'search-term' });

  it('should call getItunes service with the provided search term', () => {
    expect(generator.next().value).toEqual(call(getItunes, 'search-term'));
  });

  it('should dispatch successGetItuneSongs with the data returned by getItunes when the API call succeeds', () => {
    const data = [{ trackName: 'Song 1' }, { trackName: 'Song 2' }];
    const generatorWithResponse = getItuneSongs({ type: requestGetItuneSongs.toString(), payload: 'search-term' });
    generatorWithResponse.next();
    expect(generatorWithResponse.next({ data, ok: true }).value).toEqual(put(successGetItuneSongs(data)));
  });

  it('should not dispatch any action when the API call fails', () => {
    const generatorWithResponse = getItuneSongs({ type: requestGetItuneSongs.toString(), payload: 'search-term' });
    generatorWithResponse.next();
    expect(generatorWithResponse.next({ ok: false }).done).toBeTruthy();
  });
});
