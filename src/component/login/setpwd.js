
import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  ListView,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
import { WhiteSpace, WingBlank, Checkbox, DatePicker, List,   Button,} from 'antd-mobile-rn'
import Btn from '../common/buttonplat'
import { Toast } from 'antd-mobile-rn'

@insertStyle('loginStyle')
export default class Main extends Component {
  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      language: '',
      checked: true,
      value: '',
      text: '',
      password:'',
      passwordAgain:'',
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 1', 'row 1', 'row 1', 'row 1', 'row 1']),
    };
  }
  render() {
    return (
      <View >
        <View style="border60h"/>
        <View style='inputCon'>
          <Text style="describe">新密码</Text>
          <TextInput style="ic_input" onChangeText={(password) => this.setState({ password })}
            underlineColorAndroid="transparent"  secureTextEntry
            value={this.state.password} placeholder="请输入新密码"
          />
        </View>
        <View style="border60h"/>
        <View style='inputCon'>
          <Text style="describe">确认密码</Text>
          <TextInput style="ic_input" onChangeText={(passwordAgain) => this.setState({ passwordAgain })}
            underlineColorAndroid="transparent" secureTextEntry
            value={this.state.passwordAgain} placeholder="请再次输入新密码"
          />
        </View>
        <View style={styles.inputBtn} >
        <Btn title="确定" onPress={() => this.props.navigation.navigate('setPassword')} style={{height:40}}/>

        </View>
        {/* <Button style="inputBtn" onPress={this._btnPress} title="下一步" /> */}
        {/* <Button style={styles.inputBtn}>确定</Button> */}

      </View>
    );
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


}

const styles = StyleSheet.create({
  inputBtn:{
    margin:10,
  }
})