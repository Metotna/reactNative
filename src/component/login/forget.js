
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
import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/async_less'

@rn_Less.rnLess(style({}).loginStyle)
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:'',
      authCode:'',
      getText:'获取验证码',
      countDown:false,

    };
  }
  render() {
    return (
      <View >
        <View style='inputCon'>
          <Text style="describe">手机号</Text>
          <TextInput style="ic_input" onChangeText={(userName) => this.setState({ userName })}
            underlineColorAndroid="transparent" 
            value={this.state.userName} placeholder="请输入账号"
          />
        </View>
        <View style='inputCon'>
          <Text style="describe">验证码</Text>
          <TextInput style="ic_input" onChangeText={(authCode) => this.setState({ authCode })}
            underlineColorAndroid="transparent" 
            value={this.state.authCode} placeholder="请输入验证码"
          />
           <Text style="des_btn" onPress={this._getAuthCode}>{this.state.getText}</Text>
        </View>

        {/* <Button style="inputBtn" onPress={this._btnPress} title="下一步" /> */}
        <Button style={styles.inputBtn} onPressIn={() => this.props.navigation.navigate('setPassword')}>下一步</Button>

      </View>
    );
  }
  _getAuthCode=()=>{
    if(this.state.countDown) return
    if((Math.random()*10)>5){
      this.setState({countDown:true})
      let c = 20;
      var cDInt= setInterval(()=>{
        if(c==0){
          clearInterval(cDInt)
          this.setState({getText:'获取验证码'})
          return
        }else {
          this.setState({getText:`${c} 秒`})
          c--;
        }
      },1000)
    }
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