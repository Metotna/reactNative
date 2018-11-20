
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ListView,
  Alert,
  ActivityIndicator
} from 'react-native';

export default class Main extends Component {

  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2','row 1','row 1','row 1','row 1','row 1']),
    };
  }

  handleClick = () => {
    if (Platform.OS === 'ios') {
      Alert.alert('测试当前平台', 'iOS平台');
    } else if (Platform.OS === 'android') {
      Alert.alert('测试当前平台', 'Android平台');
    }
  }

  render() {
    return (
      <View>
        <Text>这是第1页。</Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
        {/* <ActivityIndicator></ActivityIndicator> */}
      </View>
    );
  }

}

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