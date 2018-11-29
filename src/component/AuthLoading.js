import React from 'react';
import { ActivityIndicator, Image, StatusBar, View, } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from '../util/redux/action/user';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      unshow:true
    }
    this._bootstrapAsync();
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {
    Storage.get('tokens').then(res => {
        this.props.navigation.navigate("TabbarS");
        // this.props.navigation.navigate(res ? 'Tabbar' : 'login');
        this.setState({unshow:false})
    })
  };

  // Render any loading content that you like here
  render() {
    const styles = {
      container: {
        flex:1,
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
