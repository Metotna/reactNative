import React from 'react';
import { ActivityIndicator, Image, StatusBar, View, } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from '../util/redux/action/user';
import SplashScreen from 'react-native-splash-screen'
import { StackActions, NavigationActions } from 'react-navigation';
import { Toast } from 'antd-mobile-rn'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unshow: true
    }
    Storage.get('token').then(res=>{
      if(res){
      this._bootstrapAsync();
      }else {
        this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "login" })],
        }))
      SplashScreen.hide();

      }
    })
  }
  _bootstrapAsync = () => {

    http.post('/auth/my', {}).then(res => {
      if (res) {
        if (res.status == 200) {
          let rule = res.data.roleVOS[0].key;
          if (rule == 'ADMIN' || rule == "BUSM" || rule == "SHOPM") {
            var routeName = (rule == 'ADMIN' || rule == "BUSM") ? "TabbarManager" : "TabbarStore"
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName })],
            }))
          } else {
            Toast.success('当前登录信息失效，请重新登录', 1);
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "login" })],
            }))
          }
        } else {
          this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "login" })],
          }))
        }
      }
      SplashScreen.hide();
    }).catch(err=>{
      SplashScreen.hide();
    })
  };

  // Render any loading content that you like here
  render() {
    const styles = {
      container: {
        flex: 1,
        backgroundColor: "#f2f3f5",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      imgSize: {
        flex: 1,
      }
    }
    return (
      <View style={styles.container}>
        <StatusBar hidden={this.state.unshow} />
        {/* <Image source={require('../assets/image/authloading.png')} style={styles.imgSize} resizeMode={'contain'} /> */}
      </View>
    );
  }
}
export default connect(
  store => ({
    store: store.userStore
  }),
  dispatch => bindActionCreators(userActions, dispatch)
)(AuthLoadingScreen);
