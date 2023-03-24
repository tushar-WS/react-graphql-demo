import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { SongContainer, mapDispatchToProps } from '..';
import { AnyAction } from '@reduxjs/toolkit';
describe('SongContainer', () => {
  const ituneData = {
    results: [
      {
        trackId: 1,
        artistName: 'Test Artist',
        trackName: 'Test Song',
        artworkUrl100: 'https://example.com/artwork.png'
      },
      {
        trackId: 2,
        artistName: 'Test Artist',
        trackName: 'Test Song 2',
        artworkUrl100: 'https://example.com/artwork2.png'
      }
    ]
  };

  it('renders the component with initial state', () => {
    const { getByText, getByTestId } = render(
      <SongContainer
        dispatchItuneSongs={function (payload: any): AnyAction {
          throw new Error('Function not implemented.');
        }}
        dispatchClearSongs={function (): AnyAction {
          throw new Error('Function not implemented.');
        }}
        artistName={''}
      />
    );
    expect(getByText('Get itune song details')).toBeInTheDocument();
    expect(getByTestId('search-bar')).toHaveAttribute('placeholder', 'enter artist');
    expect(screen.queryByTestId('song-card')).not.toBeInTheDocument();
  });

  it('dispatches requestGetItuneSongs action when the user types a search term', async () => {
    const dispatchMock = jest.fn();
    const { getByTestId } = render(
      <SongContainer
        dispatchItuneSongs={dispatchMock}
        dispatchClearSongs={function (): AnyAction {
          throw new Error('Function not implemented.');
        }}
        artistName={''}
      />
    );
    const searchBar = getByTestId('search-bar');
    fireEvent.change(searchBar, { target: { value: 'Test Artist' } });
    await waitFor(() => expect(dispatchMock).toHaveBeenCalledWith('Test Artist'));
  });

  it('dispatches clearItuneSongs action when the user clears the search term', async () => {
    const dispatchMock = jest.fn();
    const { getByTestId } = render(
      <SongContainer
        dispatchClearSongs={dispatchMock}
        dispatchItuneSongs={function (payload: any): AnyAction {
          throw new Error('Function not implemented.');
        }}
        artistName={''}
      />
    );
    const searchBar = getByTestId('search-bar');
    fireEvent.change(searchBar, { target: { value: '' } });
    await waitFor(() => expect(dispatchMock).toHaveBeenCalled());
  });

  it('renders the song list when the component receives data from the API', () => {
    render(
      <SongContainer
        ituneData={ituneData}
        dispatchItuneSongs={function (payload: any): AnyAction {
          throw new Error('Function not implemented.');
        }}
        dispatchClearSongs={function (): AnyAction {
          throw new Error('Function not implemented.');
        }}
        artistName={''}
      />
    );
    expect(screen.getAllByTestId('song-card')).toHaveLength(2);
  });
});

describe('mapDispatchToProps', () => {
  it('should dispatch requestGetItuneSongs action', () => {
    const dispatchMock = jest.fn();
    const { dispatchItuneSongs } = mapDispatchToProps(dispatchMock);
    dispatchItuneSongs('Test Artist');
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'songContainer/requestGetItuneSongs', payload: 'Test Artist' });
  });

  it('should dispatch clearItuneSongs action', () => {
    const dispatchMock = jest.fn();
    const { dispatchClearSongs } = mapDispatchToProps(dispatchMock);
    dispatchClearSongs();
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'songContainer/clearItuneSongs' });
  });
});
