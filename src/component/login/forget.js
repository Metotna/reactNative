
import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  ScrollView,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
import { WhiteSpace, WingBlank, Checkbox, DatePicker, List, Button, } from 'antd-mobile-rn'
import Btn from '../common/buttonplat'
import { Toast } from 'antd-mobile-rn'

@insertStyle('loginStyle')
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      authCode: '',
      password: '',
      passwordAgain: "",
      getText: '获取验证码',
      countDown: false,

    };
  }
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={{ marginTop: 6 }} />
        <View style='inputCon'>
          <View style="h40JC">
            <Text style="describe">手机号</Text>
          </View>
          <TextInput style="ic_input" onChangeText={(userName) => this.setState({ userName })}
            underlineColorAndroid="transparent"
            value={this.state.userName} placeholder="请输入账号"
          />
        </View>
        <View style="border60h" />
        <View style='inputCon'>
          <View style="h40JC">

            <Text style="describe">验证码</Text>
          </View>
          <TextInput style="ic_input" onChangeText={(authCode) => this.setState({ authCode })}
            underlineColorAndroid="transparent"
            value={this.state.authCode} placeholder="请输入验证码"
          />
          <View style={{ justifyContent: "center", height: 40 }}>
            <Text style="des_btn" onPress={this._getAuthCode}>{this.state.getText}</Text>

          </View>
        </View>

        <View style="border60h" />
        <View style='inputCon'>
          <View style="h40JC">
            <Text style="describe">新密码</Text>
          </View>
          <TextInput style="ic_input" onChangeText={(password) => this.setState({ password })}
            underlineColorAndroid="transparent" secureTextEntry
            value={this.state.password} placeholder="请输入新密码"
          />
        </View>
        <View style="border60h" />
        <View style='inputCon'>
          <View style="h40JC">
            <Text style="describe">确认密码</Text>
          </View>

          <TextInput style="ic_input" onChangeText={(passwordAgain) => this.setState({ passwordAgain })}
            underlineColorAndroid="transparent" secureTextEntry
            value={this.state.passwordAgain} placeholder="请再次输入新密码"
          />
        </View>
        <View style={styles.inputBtn} >
          <Btn title="确定" onPress={this._nextStep} style={{ height: 40 }} />

        </View>
        {/* <Button style="inputBtn" onPress={this._btnPress} title="下一步" /> */}
        {/* <Button onPressIn={() => this.props.navigation.navigate('setPassword')}>下一步</Button> */}

      </ScrollView>
    );
  }
  _nextStep = () => {
    if (!this.state.userName || !this.state.authCode || !this.state.password || !this.state.passwordAgain) {
      Toast.info('手机号、验证码或密码不能为空', 1);
    } else {
      if (this.state.password == this.state.passwordAgain) {
        http.loadingPost('/user/forget', {
          phone: this.state.userName,
          code: this.state.authCode,
          password: this.state.password,
        }, true).then(res => {
          if (res) {
            if (res.status == 200) {
              Toast.success('重置密码成功，请重新登录！', 1)
              Storage.delete("token")
              if(this.cDInt){
                clearInterval(this.cDInt)
              }
              this.props.navigation.goBack()
            } else {
              Toast.fail(res.msg, 1);
            }
          }
        }).catch(err => {
          // console.log(err)
        })
      } else {
        Toast.info('新密码不一致请重新输入！', 1);

        this.props.navigation.navigate('setPassword')
      }
    }
  }
  _getAuthCode = () => {
    if (!this.state.userName) {
      Toast.info('手机号不能为空', 1);
      return
    }
    if (this.state.countDown) return
    http.loadingPost('/user/code/get', {
      phone: this.state.userName,
      type: 1,
    }, true).then(res => {
      if (res) {
        if (res.status == 200) {
          console.log(res)
          Toast.success('验证码已发送，请注意查收', 1)
          this.setState({ countDown: true })
          let c = 60;
          this.cDInt = setInterval(() => {
            if (c == 0) {
              clearInterval(this.cDInt)
              this.setState({ getText: '获取验证码', countDown: false })
              return
            } else {
              this.setState({ getText: `${c} 秒` })
              c--;
            }
          }, 1000)
        } else {
          
        }
      }
    }).catch(err => {
      // console.log(err)
    })

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
    marginTop: 50,
  }
})