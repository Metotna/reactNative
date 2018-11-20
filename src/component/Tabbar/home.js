
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ListView,
  Alert,
  Button,
  ActivityIndicator
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from '../../util/redux/action/user';


class Main extends Component {

  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 1', 'row 1', 'row 1', 'row 1', 'row 1']),
    };
  }

  handleClick = () => {
    if (Platform.OS === 'ios') {
      Alert.alert('测试当前平台', 'iOS平台');
    } else if (Platform.OS === 'android') {
      Alert.alert('测试当前平台', 'Android平台');
    }
  }
  handlePress = () => {
    this.props.logIn({
      name:'yujie',
      password:'123'
    })

    setTimeout(()=>{
      console.log(this.props.store)

    },1000)
  }

  render() {
    return (
      <View>
        <Text style={{ 'height': 40 }}></Text>
        <Text>{this.props.store.user.name}</Text>
        <Button
          title="testbtn"
          onPress={() => this.props.navigation.navigate('Page4')}
        />
        <Button
          title="Go to Details"
          onPress={this.handlePress}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
        {/* <ActivityIndicator></ActivityIndicator> */}
      </View>
    );
  }

}

export default connect(
  store => ({
    store: store.userStore
  }),
  dispatch => bindActionCreators(userActions, dispatch)
)(Main);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});