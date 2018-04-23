const prefix = '/api/v1';


export const routes = {
  messages: {
    route: '/channels/:channelId/messages',
    param: ':channelId',
  },
};

export const getPathFromRoute = (name, id) => {
  const { route, param } = routes[name];
  return (prefix + route).replace(param, id);
};
