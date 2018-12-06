import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
// import { Button, Tabs } from 'antd-mobile-rn'
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../common/button'
@insertStyle('TabbarMineStyle')
export default class PopupExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      value: [],
      pickerValue: [],
    };
  }

  onChange = (value) => {
    console.log(value)
    this.setState({ value });
  }
  _hanleSignOut=()=>{
    Storage.delete("token")
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'login' })],
    }))
  }

  render() {
    return (
      <View style="container">
        <View style="container">
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Reseting')}>
          <View style={["h45", "flexrowbet"]} >
            <Image source={require('../../assets/image/img/pwd.png')} style="imgsizeM" />
            <Text style={["flex1", "f16", "mal8", "fblock3"]}>修改登录密码</Text>
            <Image source={require('../../assets/image/img/more.png')} style="imgsizeM" /></View>
            </TouchableHighlight>
          <View style="border10h" />
        </View>
        <View style="outBtn">
          <Button  onPress={this._hanleSignOut} textStyle={{fontSize:16,lineHeight:28,}}  title={'退出登录'}/>
        </View>
      </View>
    );
  }
}
