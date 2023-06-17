export const ROUTES = {
  editor: '/editor',
  // Other routes...
};

export const HTTP_STATUS_CODES = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

export const ERROR_MESSAGES = {
  401: 'Invalid email or password',
  403: 'You do not have access to this resource',
  500: 'An error occurred on our end. Please try again later',
  default: 'An unexpected error occurred. Please try again later',
};

export const ConnectionStatus = {
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
};
