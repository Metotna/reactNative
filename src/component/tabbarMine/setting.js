import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import { Button, Tabs } from 'antd-mobile-rn'
const CustomChildren = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={{ height: 36, paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}
    >
      <Text style={{ flex: 1 }}>{props.children}</Text>
      <Text style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</Text>
    </View>
  </TouchableOpacity>
);

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
  render() {
    return (
      <View style="container">
        <View style="container">
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Reseting')}>
          <View style={["h45", "flexrowbet"]} >
            <Image source={require('../../assets/image/img/密码 copy.png')} style="imgsizeM" />
            <Text style={["flex1", "f16", "mal8", "fblock3"]}>修改登录密码</Text>
            <Image source={require('../../assets/image/img/更多.png')} style="imgsizeM" /></View>
            </TouchableHighlight>
          <View style="border10h" />
        </View>
        <View style="outBtn">
          <Button type="primary" onPressIn={() => this.props.navigation.navigate('login')} >退出登录</Button>
        </View>
      </View>
    );
  }
}
