import React from 'react';
import { View, Text, TouchableOpacity, Image, TouchableHighlight } from 'react-native';

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
    // onPress={() => this.props.navigation.navigate('Setting')
  }
  render() {
    return (
      <View style="container">
        <TouchableHighlight >
          <View style={["h90", "flexrowbet"]} >
            <Image source={require('../../assets/image/img/我的 copy.png')} style="imgsize" />
            <Text style="phone">151 **** 1798</Text>
          </View>
        </TouchableHighlight>
        <View style="border60h" />

        <TouchableHighlight onPress={() => this.props.navigation.navigate('StoreInfo')}>
          <View style={["h45", "flexrowbet"]} >
            <Image source={require('../../assets/image/img/门店信息.png')} style="imgsizeM" />
            <Text style={["flex1", "f16", "mal8", "fblock3"]}>门店信息</Text>
            <Image source={require('../../assets/image/img/更多.png')} style="imgsizeM" /></View>
        </TouchableHighlight>
        <View style="border10h" />

        <TouchableHighlight onPress={() => this.props.navigation.navigate('CompanyInfo')}>
          <View style={["h45", "flexrowbet"]} >
            <Image source={require('../../assets/image/img/必赢信息.png')} style="imgsizeM" />
            <Text style={["flex1", "f16", "mal8", "fblock3"]}>必赢信息</Text>
            <Image source={require('../../assets/image/img/更多.png')} style="imgsizeM" /></View>
        </TouchableHighlight>
        <View style="border10h" />

        <TouchableHighlight onPress={() => this.props.navigation.navigate('Setting')}>
          <View style={["h45", "flexrowbet"]} >
            <Image source={require('../../assets/image/img/设置.png')} style="imgsizeM" />
            <Text style={["flex1", "f16", "mal8", "fblock3"]} >设置</Text>
            <Image source={require('../../assets/image/img/更多.png')} style="imgsizeM" />
          </View>
        </TouchableHighlight>
        <View style="border10h" />
      </View>
    );
  }
}
