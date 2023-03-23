import React, { useEffect } from 'react';
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
`;

type SongContainerType = {
  ituneData: any;
  singleItune: any;
  dispatchGetSingleItune: (payload: any) => AnyAction;
};

export function songDetailContainer({ ituneData, singleItune, dispatchGetSingleItune }: SongContainerType) {
  console.log('i m here inside 1');

  const { trackId }: any = useParams();
  const songs = get(ituneData, 'results', null);
  let data = songs?.find((item: { trackId: number }) => item.trackId === Number(trackId));
  const songDetails = data ?? (!isEmpty(singleItune) && singleItune.results[0]);
  const { artistName, trackName, artworkUrl100: imgUrl } = songDetails;

  let dataIsPresent =
    data ||
    (!isEmpty(singleItune) &&
      singleItune.results.find((item: { trackId: number }) => item.trackId === Number(trackId)));

  useEffect(() => {
    if (!dataIsPresent) {
      dispatchGetSingleItune(trackId);
    }
  }, [ituneData]);

  return (
    <DetailsCard>
      <img data-testid="song-image" src={imgUrl} />
      <div>
        <T data-testid="artist-name" id="artist_name" type="heading" values={{ artistName }} />
        <T data-testid="track-name" id="track_name" type="heading" values={{ trackName }} />
      </div>
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

export default compose(withConnect, injectSaga({ key: 'songDetailContainer', saga }))(songDetailContainer);

export const SongDetailContainerTest = songDetailContainer;
