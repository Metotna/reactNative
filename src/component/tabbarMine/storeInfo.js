import React from 'react';
import { View, Text, ScrollView, ListView } from 'react-native';
import TextShow from '../common/textShow'

@insertStyle('TabbarMineStyle')
export default class PopupExample extends React.Component {
  constructor(props) {
    super(props);
    var rowData = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: '',
      value: [],
      baseInfo: {
        shopName: '杭州小一网吧',
        workType: "自营",
        lotOrg: "体彩",
        schedule: "正常营业",
        area: "浙江省杭州市",
        address: "文二西路凯新通信大厦",
        linkman: "王五",
        linkPhone: "15145671234",
      },
      netBarInfo: {
        bankUser: '王二',
        bankNumber: '6221 1458 6324 7859 124',
        bankName: '中国建设银行',
        linkman: "王二",
        linkPhone: "15145671234",
      },
      dataSource: rowData.cloneWithRows([
        { id: '01-001', sellLot: '竞彩、数字彩、高频彩', openTime: '2018-11-13', },
        { id: '01-002', sellLot: '竞彩、数字彩、高频彩', openTime: '2018-08-13', },
      ]),
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
        <TextShow title={'网吧名称'} content={this.state.baseInfo.shopName} />
        <View style="border10h" />
        <TextShow title={'合作方式'} content={this.state.baseInfo.workType} />
        <View style="border10h" />
        <TextShow title={'网吧类型'} content={this.state.baseInfo.lotOrg} />
        <View style="border10h" />
        <TextShow title={'进度'} content={this.state.baseInfo.schedule} />
        <View style="border10h" />
        <TextShow title={'所在地区'} content={this.state.baseInfo.area} />
        <View style="border10h" />
        <TextShow title={'详细地址'} content={this.state.baseInfo.address} />
        <View style="border10h" />
        <TextShow title={'联系人'} content={this.state.baseInfo.linkman} />
        <View style="border10h" />
        <TextShow title={'联系方式'} content={this.state.baseInfo.linkPhone} />
        
        <Text style="netBarTitle">网吧结算账户信息</Text>
        
        <TextShow title={'持卡人'} content={this.state.netBarInfo.bankUser} />
        <View style="border10h" />
        <TextShow title={'银行卡号'} content={this.state.netBarInfo.bankNumber} />
        <View style="border10h" />
        <TextShow title={'银行名称'} content={this.state.netBarInfo.bankName} />
        <View style="border10h" />
        <TextShow title={'联系人'} content={this.state.netBarInfo.linkman} />
        <View style="border60h" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(row) => (
            <View>
              <TextShow title={'机器编号：'} content={row.id} />
              <View style={style.h10} />
              <TextShow title={'在售彩种：'} content={row.sellLot} />
              <View style={style.h10} />
              <TextShow title={'开始营业时间：'} content={row.openTime} />
              <View style={style.h60} />
            </View>
          )}
        />
      </ScrollView>
    );
  }
}
