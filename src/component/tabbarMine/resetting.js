
import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, TextInput, } from 'react-native';
import { Button, } from 'antd-mobile-rn'

@insertStyle('loginStyle')
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      password: '',
      passwordAgain: '',
    };
  }
  render() {
    return (
      <View >
        <View style="border150h"/>
        <View style='inputCon'>
          <Text style="describe">原密码</Text>
          <TextInput style="ic_input" onChangeText={(oldPassword) => this.setState({ oldPassword })}
            underlineColorAndroid="transparent" secureTextEntry
            value={this.state.oldPassword} placeholder="请输入原密码"
          />
        </View>

        <View style="border150h"/>

        <View style='inputCon'>
          <Text style="describe">新密码</Text>
          <TextInput style="ic_input" onChangeText={(password) => this.setState({ password })}
            underlineColorAndroid="transparent" secureTextEntry
            value={this.state.password} placeholder="请输入新密码"
          />
        </View>
        <View style="border150h"/>

        <View style='inputCon'>
          <Text style="describe">确认密码</Text>
          <TextInput style="ic_input" onChangeText={(passwordAgain) => this.setState({ passwordAgain })}
            underlineColorAndroid="transparent" secureTextEntry
            value={this.state.passwordAgain} placeholder="请再次输入新密码"
          />
        </View>

        <Button type="primary" style={{margin:10,marginTop:20}} onPressIn={() => this.props.navigation.navigate('login')}>确定</Button>

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
  inputBtn: {
    margin: 10,
  }
})