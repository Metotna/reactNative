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
        name: '',
        address: "",
        linkman: "",
        linkPhone: "",
      },
    };
  }
  componentDidMount() {
    http.loadingPost("/netbar/my/companyInfo", {}).then(res => {
      if (res) {
        if (res.status == 200) {
          this.setState({
            baseInfo: {
              name: res.data.companyName,
              address: res.data.companyAddr,
              linkman: res.data.linkman,
              linkPhone: res.data.linkPhone,
            },
          })
        }
      }
    })
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
