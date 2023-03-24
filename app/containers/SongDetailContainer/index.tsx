import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { useParams } from 'react-router-dom';
import { get, isEmpty } from 'lodash';
import styled from 'styled-components';
import T from '@components/T';
import saga from './saga';
import { selectItuneData } from '../SongContainer/selectors';
import { selectTrackId, selectSingleItune } from './selectors';
import { requestGetSingleItune } from './reducer';
import { AnyAction } from '@reduxjs/toolkit';

const DetailsCard = styled.div`
  border: 1px solid black;
  border-radius: 0.65rem;
  padding: 1rem;
  width: 70%;
  height: 15rem;
  margin: auto;
  margin-top: 3rem;

  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const SongImage = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  object-fit: cover;
`;

const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PlayButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: #f94144;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ee2e31;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(249, 65, 68, 0.4);
  }
`;

const Audio = styled.audio`
  width: 100%;
  margin-top: 1rem;
`;

type SongContainerType = {
  ituneData: any;
  singleItune: any;
  dispatchGetSingleItune: (payload: any) => AnyAction;
};

export function songDetailContainer({ ituneData, singleItune, dispatchGetSingleItune }: SongContainerType) {
  const { trackId }: any = useParams();
  const songs = get(ituneData, 'results', null);
  const data = songs?.find((item: { trackId: number }) => item.trackId === Number(trackId));
  const songDetails = data ?? (!isEmpty(singleItune) && singleItune.results[0]);
  const { artistName, trackName, artworkUrl100: imgUrl, previewUrl } = songDetails;

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!data && isEmpty(singleItune)) {
      dispatchGetSingleItune(trackId);
    }
  }, [data, singleItune]);

  return (
    <DetailsCard>
      <SongImage data-testid="song-image" src={imgUrl} />
      <SongDetails>
        <T data-testid="artist-name" type="heading" text={artistName} />
        <T data-testid="track-name" type="heading" text={trackName} />
        <PlayButton onClick={handlePlay}>Play</PlayButton>
        {isPlaying && <Audio src={previewUrl} autoPlay />}
      </SongDetails>
    </DetailsCard>
  );
}

songDetailContainer.propTypes = {
  ituneData: PropTypes.object,
  singleItune: PropTypes.object,
  dispatchGetSingleItune: PropTypes.func
};

songDetailContainer.defaultProps = {
  ituneData: {},
  singleItune: {},
  dispatchGetSingleItune: () => {}
};

const mapStateToProps = createStructuredSelector({
  ituneData: selectItuneData(),
  trackId: selectTrackId(),
  singleItune: selectSingleItune()
});

export function mapDispatchToProps(dispatch: any) {
  return {
    dispatchGetSingleItune: (trackId: any) => dispatch(requestGetSingleItune(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

// export default compose(withConnect, injectSaga({ key: 'SongDetailContainer', saga }))(SongDetail

export default compose(withConnect, injectSaga({ key: 'songDetailContainer', saga }))(songDetailContainer);

export const SongDetailContainerTest = songDetailContainer;
