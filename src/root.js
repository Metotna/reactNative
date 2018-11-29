import React, { Component } from "react";
import { Provider, connect, } from "react-redux";
import { ActivityIndicator, View,Text } from 'react-native';
import NavigationService from './util/fetch/NavigationService'

import AppNavigator from './util/router';
import store from './util/redux/index'
import './util/install'
import Loading from './component/common/Loading'
// const navReducer = (state, action) => {
//   const newState = AppNavigator.router.getStateForAction(action, state);
//   return newState || state;
// };
let self; //将App组件中的this赋给全局的self
global.showLoading = false; //所有子页面均可直接调用global.showLoading()来展示Loading
global.closeLoading = false; //所有子页面均可直接调用global.closeLoading()来关闭Loading

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps,null,null,{withRef: true})(AppNavigator);
export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    global.showLoading =()=> { this.Loading.show()};
    global.closeLoading =()=> { this.Loading.close()};
    setTimeout(()=>{NavigationService.setTopLevelNavigator(this.refs.root.getWrappedInstance())})
}

  componentWillUnmount() {
    // 移除监听
    // this.viewDidAppear.remove();
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Loading ref={r=>{this.Loading = r}} hide = {true} />
        <Provider store={store} >
          <AppWithNavigationState ref='root'/>
        </Provider>
      </View>
    );
  }
}