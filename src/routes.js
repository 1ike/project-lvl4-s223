const prefix = '/api/v1';


const getPathFromRoute = (routeData, id) => {
  const { route, param, baseRoute } = routeData;

  return id ? (prefix + route).replace(param, id) : prefix + baseRoute;
};


const messages = {
  route: '/channels/:channelId/messages',
  param: ':channelId',
};

const channels = {
  route: '/channels/:channelId',
  param: ':channelId',
  baseRoute: '/channels',
};


export default {
  messages: {
    ...messages,
    getURL: id => getPathFromRoute(messages, id),
  },
  channels: {
    ...channels,
    getURL: id => getPathFromRoute(channels, id),
  },
};

