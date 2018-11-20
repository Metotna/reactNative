
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
import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/test_less'

Storage.save('token', '14854786')

@rn_Less.rnLess(style({}).CardExampleStyle)
class Main extends Component {
  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      language: '',
      checked: true,
      value: '',
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
  onChange = (val) => {
    let r = new Date(val).format('yyyy/MM/dd')
    this.setState({
      value: val
    })
  }
  _btnPress = () => {
    Storage.get('token').then((tags) => {
      // console.log(1,tags)
    });
  }
  render() {
    return (
      <View style={styles.container}>
      <Text style="temptext">123123123213</Text>
        <List>
          <DatePicker
            value={this.state.value}
            mode="date"
            minDate={new Date(2015, 7, 6)}
            maxDate={new Date(2026, 11, 3)}
            onChange={this.onChange}
            format="YYYY-MM-DD"
          >
            <List.Item arrow="horizontal">Select Date</List.Item>
          </DatePicker>
        </List>
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
export default Main