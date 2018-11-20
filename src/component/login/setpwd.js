
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ListView,
  Picker,
  Alert,
  Button,
  ActivityIndicator
} from 'react-native';
import { WhiteSpace, WingBlank, Checkbox, DatePicker, List } from 'antd-mobile-rn'

export default class Main extends Component {

  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    this.state = {
      language: '',
      checked: true,
      value: '',
    };
  }

  handleClick = () => {
    if (Platform.OS === 'ios') {
      Alert.alert('测试当前平台', 'iOS平台');
    } else if (Platform.OS === 'android') {
      Alert.alert('测试当前平台', 'Android平台');
    }
  }
  onChange = (val) => {
    let r = new Date(val).format('yyyy/MM/dd')
    this.setState({
      value: val
    })
  }
  _btnPress = () => {
    Storage.get('token').then((tags) => {
      console.log(1,tags)
    });
  }
  render() {
    return (
      <View style={styles.container}>

        <WingBlank>
          <WhiteSpace />
          <Button onPress={this._btnPress} title="Press Me" />
          <WhiteSpace />
          <WhiteSpace />
        </WingBlank>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },

});
