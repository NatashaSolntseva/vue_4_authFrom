export enum ROUTE_NAMES {
  SIGN_IN = 'SignIn',
  SIGN_UP = 'SignUp',
  FORGOT_PASSWORD = 'ForgotPassword',
  LIST = 'List',
  LIST_ITEM = 'ListItem',
  NOT_FOUND = 'NotFound',
}

export const ROUTE_PATHS = {
  [ROUTE_NAMES.SIGN_IN]: '/signin',
  [ROUTE_NAMES.SIGN_UP]: '/signup',
  [ROUTE_NAMES.FORGOT_PASSWORD]: '/forgot-password',
  [ROUTE_NAMES.LIST]: '/list',
  [ROUTE_NAMES.LIST_ITEM]: '/list/:id',
  [ROUTE_NAMES.NOT_FOUND]: '/:pathMatch(.*)*',
}
