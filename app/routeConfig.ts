import React from 'react';
import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import LaunchDetails from '@containers/LaunchDetails/Loadable';
import routeConstants, { RouteConstant } from '@utils/routeConstants';
import SongContainer from '@containers/SongContainer/Loadable';
import SongDetailContainer from '@containers/SongDetailContainer/Loadable';

type RouteConfig = Record<string, { component: React.FC<any> } & Partial<RouteConstant>>;

export const routeConfig: RouteConfig = {
  home: {
    component: HomeContainer,
    ...routeConstants.home
  },
  ituneSongPage: {
    component: SongContainer,
    ...routeConstants.songs
  },
  songDetailPage: {
    component: SongDetailContainer,
    ...routeConstants.song
  },
  launch: {
    component: LaunchDetails,
    ...routeConstants.launch
  }
  // notFoundPage: {
  //   component: NotFound,
  //   route: '/'
  // }
};
