export * from "./main-navigator"
export * from "./root-navigator"
export * from "./navigation-utilities"
// export other navigators from here

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  welcome: undefined
  tabScreen: undefined
  demo: undefined
  login: undefined
  register: undefined
  home: undefined
  sendAssets: undefined
  detail: undefined
}

export const Screens = {
  welcome: 'welcome',
  tabScreen: 'tabScreen',
  demo: 'demo',
  login: 'login',
  register: 'register',
  home: 'home',
  sendAssets: 'sendAssets',
  detail: 'detail',
}
