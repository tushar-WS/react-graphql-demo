export type RouteConstant = {
  route: string;
  exact?: boolean;
  isProtected?: boolean;
  props?: object;
};

const routeConstants: Record<string, RouteConstant> = {
  home: {
    route: '/',
    exact: true
  },
  login: {
    route: '/login',
    exact: true
  },
  songs: {
    route: '/song',
    exact: true
  },
  launch: {
    route: '/launch/:launchId',
    exact: true
  }
};

export type RouteKeys = keyof typeof routeConstants;

export default routeConstants;
