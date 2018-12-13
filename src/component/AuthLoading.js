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
    Storage.get('token').then(res => {
      // console.log(`token:` + res)
      // this.props.navigation.navigate('login')
      if (res) {
        this._bootstrapAsync();
      } else {
        // console.log(`token unexist`)
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
      // console.log(res)
      if (res) {
        let routeName = 'login'
        if (res.status == 200) {
          let rule = res.data.roleVOS[0].key;
          Storage.save("rule", rule)
          if (rule == 'ADMIN' || rule == "BUSM" || rule == "SHOPM") {
            routeName = rule == 'SHOPM' ? "TabbarStore" : "TabbarManager";
          } else {
            Toast.success('当前登录信息失效，请重新登录', 1);
            routeName = "login"
          }
        }
        this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName })],
        }))
        // this.props.navigation.dispatch(StackActions.popToTop())
        // console.log(routeName)
        // this.props.navigation.dispatch(StackActions.reset({
        //   index: 0,
        //   actions: [NavigationActions.navigate({ routeName })],
        // }))
      }
      SplashScreen.hide()
    }).catch(err => {
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
