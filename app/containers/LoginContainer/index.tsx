import React, { useEffect, memo, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AnyAction, compose } from 'redux';
import debounce from 'lodash-es/debounce';
import isEmpty from 'lodash-es/isEmpty';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { injectSaga } from 'redux-injectors';
import { Button, Input, Select } from 'antd';
//import { selectLaunchData, selectLaunchListError, selectLoading } from './selectors';
import arrowUp from '@images/ArrowUp.svg';
import arrowDown from '@images/ArrowDown.svg';
import arrowUpDown from '@images/ArrowUpDown.svg';
//import homeContainerSaga from './saga';
//import { requestGetLaunchList } from './reducer';
import { LaunchList, ErrorHandler } from '@components';
import { colors, media } from '@app/themes';
import { injectIntl } from 'react-intl';
import { setQueryParam } from '@app/utils';
import history from '@app/utils/history';
//import { RequestLaunchesActionPayload, HomeContainerProps } from './types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export function LoginContainer() {
  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          // onChange={(event) => {
          //   setRegisterEmail(event.target.value);
          // }}
        />
        <input
          placeholder="Password..."
          // onChange={(event) => {
          //   setRegisterPassword(event.target.value);
          // }}
        />

        <button> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          // onChange={(event) => {
          //   setLoginEmail(event.target.value);
          // }}
        />
        <input
          placeholder="Password..."
          // onChange={(event) => {
          //   setLoginPassword(event.target.value);
          // }}
        />

        <button> Login</button>
      </div>

      <h4> User Logged In: </h4>
      {/* {user?.email} */}

      <button> Sign Out </button>
    </div>
  );
}

LoginContainer.propTypes = {
  dispatchLaunchList: PropTypes.func,
  launchData: PropTypes.shape({
    launches: PropTypes.array
  }),
  launchListError: PropTypes.string,
  history: PropTypes.object,
  intl: PropTypes.object
};

LoginContainer.defaultProps = {
  launchData: {},
  launchListError: null
};

const mapStateToProps = createStructuredSelector({
  //   launchData: selectLaunchData(),
  //   launchListError: selectLaunchListError(),
  //   loading: selectLoading()
});

export function mapDispatchToProps(dispatch: (arg0: AnyAction) => any) {
  return {
    // dispatchLaunchList: (payload: RequestLaunchesActionPayload) => dispatch(requestGetLaunchList(payload))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  //   injectSaga({ key: 'homeContainer', saga: homeContainerSaga }),
  injectIntl
)(LoginContainer);

export const LoginContainerTest = LoginContainer;
