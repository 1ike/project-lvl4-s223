const prefix = '/api/v1';


const getPathFromRoute = (routeData, id) => {
  const { route, param } = routeData;
  return (prefix + route).replace(param, id);
};


const messages = {
  route: '/channels/:channelId/messages',
  param: ':channelId',
};

export default {
  messages: {
    ...messages,
    getURL: id => getPathFromRoute(messages, id),
  },
};

