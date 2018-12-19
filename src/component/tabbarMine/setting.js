import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
// import { Button, Tabs } from 'antd-mobile-rn'
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../common/buttonplat'
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

  _hanleSignOut=()=>{
    Storage.delete("token")
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'login' })], 0)
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
          <Button style={{height:35}} onPress={this._hanleSignOut} textStyle={{fontSize:16}}  title={'退出登录'}/>
        </View>
      </View>
    );
  }
}
