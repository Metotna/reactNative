import React from 'react';
import { View, Text, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import Tabs from '../common/tabs'
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
      user: '',
      storeInfo: false,
    };

  }
  componentWillMount() {
    Storage.get('user').then(res => {
      this.setState({
        user: res
      })
    })
    Storage.get("rule").then(res => {
      if (res == "SHOPM") {
        this.setState({ storeInfo: true })
      } else {
        this.setState({ storeInfo: false })

      }
    })
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
            <Image source={require('../../assets/image/my/head.png')} style="imgsize" />
            <Text style="phone">{this.state.user}</Text>
          </View>
        </TouchableHighlight>
        <View style="border60h" />
        {
          this.state.storeInfo
            ? <View>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('StoreInfo')}>
                <View style={["h45", "flexrowbet"]} >
                  <Image source={require('../../assets/image/img/mdinfo.png')} style="imgsizeM" />
                  <Text style={["flex1", "f16", "mal8", "fblock3"]}>门店信息</Text>
                  <Image source={require('../../assets/image/img/more.png')} style="imgsizeM" /></View>
              </TouchableHighlight>
              <View style="border10h" />
            </View>
            : null
        }


        <TouchableHighlight onPress={() => this.props.navigation.navigate('CompanyInfo')}>
          <View style={["h45", "flexrowbet"]} >
            <Image source={require('../../assets/image/img/byinfo.png')} style="imgsizeM" />
            <Text style={["flex1", "f16", "mal8", "fblock3"]}>必赢信息</Text>
            <Image source={require('../../assets/image/img/more.png')} style="imgsizeM" /></View>
        </TouchableHighlight>
        <View style="border10h" />

        <TouchableHighlight onPress={() => this.props.navigation.navigate('Setting')}>
          <View style={["h45", "flexrowbet"]} >
            <Image source={require('../../assets/image/img/set.png')} style="imgsizeM" />
            <Text style={["flex1", "f16", "mal8", "fblock3"]} >设置</Text>
            <Image source={require('../../assets/image/img/more.png')} style="imgsizeM" />
          </View>
        </TouchableHighlight>
        <View style="border10h" />
      </View>
    );
  }
}
