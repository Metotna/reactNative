import React, { Component } from "react";
import { Provider, connect, } from "react-redux";
import AppNavigator from './util/router';
import store from './util/redux/index'
import './util/install'
// const navReducer = (state, action) => {
//   const newState = AppNavigator.router.getStateForAction(action, state);
//   return newState || state;
// };

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(AppNavigator);

export default function Root() {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
}
