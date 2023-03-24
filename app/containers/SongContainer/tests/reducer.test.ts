import SongContainerReducer, {
  initialState,
  requestGetItuneSongs,
  successGetItuneSongs,
  clearItuneSongs
} from '../reducer';
import { RootState } from '@app/configureStore';

describe('songContainer reducer', () => {
  let mockedState: RootState;
  let artistName: string;
  let ituneData: {};

  beforeEach(() => {
    artistName = 'taylor';
    ituneData = [
      {
        resultCount: 50,
        results: [{ artistName }]
      }
    ];

    mockedState = {
      songContainer: {
        artistName,
        ituneData
      }
    };
  });

  it('should return the initial state', () => {
    expect(SongContainerReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle requestGetItuneSongs', () => {
    const state = SongContainerReducer(initialState, requestGetItuneSongs(mockedState));
    expect(state.loading).toEqual(true);
  });

  it('should handle successGetItuneSongs', () => {
    const payload = { resultCount: 1, results: [{ artistName: 'test' }] };
    const state = SongContainerReducer(initialState, successGetItuneSongs(payload));
    expect(state.loading).toEqual(false);
    expect(state.ituneData).toEqual(payload);
  });

  it('should handle clearItuneSongs', () => {
    const state = SongContainerReducer(initialState, clearItuneSongs());
    expect(state.loading).toEqual(false);
    expect(state.artistName).toEqual(null);
    expect(state.ituneData).toEqual({});
  });
});
