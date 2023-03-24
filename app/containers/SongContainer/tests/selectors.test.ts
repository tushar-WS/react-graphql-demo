import { selectArtistName, selectItuneData, selectSongContainerDomain } from '../selectors';
import { initialState } from '../reducer';
import { RootState } from '@app/configureStore';
describe('HomeContainer selector tests', () => {
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

  it('should select the artistName state', () => {
    const ituneSelector = selectArtistName();
    expect(ituneSelector(mockedState)).toEqual(artistName);
  });

  it('should select the ituneData state', () => {
    const ituneDataSelector = selectItuneData();
    expect(ituneDataSelector(mockedState)).toEqual(ituneData);
  });

  it('should select the global state', () => {
    const globalSelector = selectSongContainerDomain(initialState);
    expect(globalSelector).toEqual(initialState);
  });
});
