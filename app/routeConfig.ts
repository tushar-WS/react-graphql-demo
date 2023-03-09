import React from 'react';
import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import LaunchDetails from '@containers/LaunchDetails/Loadable';
import routeConstants, { RouteConstant } from '@utils/routeConstants';
import LoginContainer from './containers/LoginContainer';

type RouteConfig = Record<string, { component: React.FC<any> } & Partial<RouteConstant>>;

export const routeConfig: RouteConfig = {
  home: {
    component: HomeContainer,
    ...routeConstants.home
  },
 login: {
    component: LoginContainer,
    ...routeConstants.login
  },
  launch: {
    component: LaunchDetails,
    ...routeConstants.launch
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
