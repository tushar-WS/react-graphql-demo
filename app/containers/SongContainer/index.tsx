import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectItuneData, selectArtistName } from './selectors';
import { Input } from 'antd';
import ItuneCard from '@app/components/ItuneCard';
import { requestGetItuneSongs, clearItuneSongs } from './reducer';
import For from '@app/components/For';
import saga from './saga';
import get from 'lodash/get';
import styled from 'styled-components';
import { AnyAction } from '@reduxjs/toolkit';

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const StyledInput = styled(Input)`
  && {
    width: 25rem;
    height: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type SongContainerType = {
  artistName: string;
  ituneData: any;
  dispatchItuneSongs: (payload: any) => AnyAction;
  dispatchClearSongs: () => AnyAction;
};
export function SongContainer({ ituneData, dispatchItuneSongs, dispatchClearSongs, artistName }: SongContainerType) {
  console.log({ ituneData });
  console.log('in song');
  console.log(artistName);

  const changeHandler = (evt: { target: { value: any } }) => {
    const searchTerm = evt.target.value;

    if (searchTerm) {
      dispatchItuneSongs(searchTerm);
    } else {
      dispatchClearSongs();
    }
  };

  const renderSongList = () => {
    const songs = get(ituneData, 'results', null);
    console.log('in render song');

    console.log(ituneData);

    console.log({ songs });

    return (
      <>
        <For
          of={songs}
          ParentComponent={CardWrapper}
          renderItem={(item: any, index) => <ItuneCard key={index} {...item} />}
        />
      </>
    );
  };

  return (
    <Wrapper>
      <h2>Get itune song details</h2>
      <StyledInput placeholder="enter artist" onChange={changeHandler} type="text" data-testid="search-bar" />
      <CardWrapper>{renderSongList()}</CardWrapper>
    </Wrapper>
  );
}

SongContainer.propTypes = {
  artistName: PropTypes.string,
  ituneData: PropTypes.object,
  dispatchClearSongs: PropTypes.func,
  dispatchItuneSongs: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  ituneData: selectItuneData(),
  artistName: selectArtistName()
});

export function mapDispatchToProps(dispatch: any) {
  return {
    dispatchItuneSongs: (artistName: any) => dispatch(requestGetItuneSongs(artistName)),
    dispatchClearSongs: () => dispatch(clearItuneSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'songContainer', saga }))(SongContainer);

export const SongContainerTest = SongContainer;
