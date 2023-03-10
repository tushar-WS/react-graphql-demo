import React, { useEffect, memo, ChangeEvent, useState } from 'react';
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
// import { selectLaunchData, selectLaunchListError, selectLoading } from './selectors';
import arrowUp from '@images/ArrowUp.svg';
import arrowDown from '@images/ArrowDown.svg';
import arrowUpDown from '@images/ArrowUpDown.svg';
// import homeContainerSaga from './saga';
// import { requestGetLaunchList } from './reducer';
import { LaunchList, ErrorHandler } from '@components';
import { colors, media } from '@app/themes';
import { injectIntl } from 'react-intl';
import { setQueryParam } from '@app/utils';
import history from '@app/utils/history';
// import { RequestLaunchesActionPayload, HomeContainerProps } from './types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase-config';

export function LoginContainer() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({});

  console.log({
    registerEmail
  });
  interface User {
    email: string;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return unsubscribe();
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(user);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };
  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={() => register()}> Create User</button>
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

        <button onClick={login}> Login</button>
      </div>

      <h4> User Logged In: </h4>
      {/* { {user?.email}} */}

      <button onClick={logout}> Sign Out </button>
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
