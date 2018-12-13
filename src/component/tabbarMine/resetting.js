
import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, TextInput, ScrollView } from 'react-native';
import Button from '../common/buttonplat'
import { Toast } from 'antd-mobile-rn'
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';


@insertStyle('loginStyle')
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      password: '',
      passwordAgain: '',
    };
  }

  _hanleReset = () => {
    if (!this.state.oldPassword || !this.state.password || !this.state.passwordAgain) {
      Toast.info('密码不能为空！', 1);
    } else {
      if (this.state.password == this.state.passwordAgain) {
        http.loadingPost('/user/modifyPwd', {
          oldPwd: this.state.oldPassword,
          newPwd: this.state.password,
        }).then(res => {
          if (res) {
            if (res.status == 200) {
              Toast.success('修改成功，请重新登录！', 1)
              Storage.delete("token")
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "login" })],
              }))
            } else {
              Toast.fail(res.msg, 1);
            }
          }
        }).catch(err => {
          // console.log(err)
        })
      } else {
        Toast.fail('新密码不一致，请确认', 1);
      }
    }

  }

  render() {
    return (
      <ScrollView  keyboardShouldPersistTaps={'handled'}>
        <View style="border150h" />
        <View style='inputCon'>
          <View style="h40JC">
            <Text style="describe">原密码</Text>
          </View>
          <TextInput style="ic_input" onChangeText={(oldPassword) => this.setState({ oldPassword })}
            underlineColorAndroid="transparent" secureTextEntry
            value={this.state.oldPassword} placeholder="请输入原密码"
          />
        </View>

        <View style="border150h" />

        <View style='inputCon'>
          <View style="h40JC">
            <Text style="describe">新密码</Text>
          </View>
          <TextInput style="ic_input" onChangeText={(password) => this.setState({ password })}
            underlineColorAndroid="transparent" secureTextEntry
            value={this.state.password} placeholder="请输入新密码"
          />
        </View>
        <View style="border150h" />

        <View style='inputCon'>
          <View style="h40JC">
            <Text style="describe">确认密码</Text>
          </View>
          <TextInput style="ic_input" onChangeText={(passwordAgain) => this.setState({ passwordAgain })}
            underlineColorAndroid="transparent" secureTextEntry
            value={this.state.passwordAgain} placeholder="请再次输入新密码"
          />
        </View>
        <View style={{ marginTop: 15, marginRight: 12, marginLeft: 12 }}>
          <Button onPress={() => this._hanleReset()} style={{ height: 40 }} textStyle={{ fontSize: 16, }} title={'确定'} />
        </View>


      </ScrollView>
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
export default withNavigation(Main)