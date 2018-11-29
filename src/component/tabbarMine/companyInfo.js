import React from 'react';
import { View, Text, ScrollView, ListView } from 'react-native';
import TextShow from '../common/textShow'

@insertStyle('TabbarMineStyle')
export default class PopupExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      value: [],
      baseInfo: {
        name: '杭州小一网吧',
        address: "浙江省杭州市文二西路凯新通信大厦",
        linkman: "王五",
        linkPhone: "15145671234",
      },
    };
  }
  render() {
    const style = {
      h10: {
        height: 1,
        backgroundColor: '#f2f3f5'
      },
      h60: {
        height: 6,
        backgroundColor: '#f2f3f5'
      }
    }
    return (
      <ScrollView style="container">
        <TextShow title={'公司名称'} content={this.state.baseInfo.name} />
        <View style="border10h" />
        <TextShow title={'公司地址'} content={this.state.baseInfo.address} />
        <View style="border10h" />
        <TextShow title={'业务组长'} content={this.state.baseInfo.linkman} />
        <View style="border10h" />
        <TextShow title={'联系方式'} content={this.state.baseInfo.linkPhone} />
        <View style="border60h" />
      </ScrollView>
    );
  }
}
