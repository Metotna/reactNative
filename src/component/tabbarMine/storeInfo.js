import React from 'react';
import { View, Text, ScrollView, ListView, FlatList } from 'react-native';
import TextShow from '../common/textShow'
import f from '../../util/filter'
import distrst from '../common/ssq'

@insertStyle('TabbarMineStyle')
export default class PopupExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      value: [],
      baseInfo: {
        shopName: '',
        workType: "",
        lotOrg: "",
        schedule: "",
        area: "",
        address: "",
        linkman: "",
        linkPhone: "",
      },
      netBarInfo: {
        bankUser: '',
        bankNumber: '',
        bankName: '',
        linkman: "",
        linkPhone: "",
      },
      dataSource: [],
    };
  }

  componentWillMount() {
    /* 组件初始化时只调用,整个生命周期只调用一次 */
  }
  componentDidMount() {
    http.loadingPost("/netbar/my/shopInfo", {}).then(res => {
      if (res) {
        if (res.status == 200) {
          let bank = res.data.bank ? JSON.parse(res.data.bank) : {}
          let area = res.data.area ? JSON.parse(res.data.area) : ''
          this._handelarea(area)
          this.setState({
            baseInfo: {
              shopName: res.data.shopName,
              workType: res.data.workType,
              lotOrg: res.data.lotOrg,
              schedule: res.data.schedule,
              area: this._handelarea(area),
              address: res.data.address,
              linkman: res.data.linkman,
              linkPhone: res.data.linkPhone,
            },
            netBarInfo: {
              bankUser: bank.name || '',
              bankNumber: bank.cardno || '',
              bankName: bank.bank || '',
              linkman: res.data.linkman,
              linkPhone: res.data.linkPhone,
            },
            dataSource: res.data.machineVOS
          })
        }
      }
    })
  }

  _handelarea(val) {
    let r = ""
    if (val && val.length == 3) {
      distrst.map(x => {
        if (x.value == val[0]) {
          r = x.label + ',';
          x.children.map(y => {
            if (y.value == val[1]) {
              r = r + y.label + ',';
              y.children.map(z => {
                if (z.value == val[2]) {
                  r += z.label
                }
              })
            }
          })  
        }
      })
    }
    // console.log(r)
    return r
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
        <TextShow title={'合作方式'} content={f.workType(this.state.baseInfo.workType)} />
        <View style="border10h" />
        <TextShow title={'网吧类型'} content={f.lotOrgRes(this.state.baseInfo.lotOrg)} />
        <View style="border10h" />
        <TextShow title={'进度'} content={f.lotOrgRes(this.state.baseInfo.lotOrg, this.state.baseInfo.schedule)} />
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

        <FlatList
          data={this.state.dataSource}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) =>
            <View>
              <TextShow title={'机器编号：'} content={item.sn} />
              <View style={style.h10} />
              <TextShow title={'在售彩种：'} content={f.sellLot(item.sellLot)} />
              <View style={style.h10} />
              <TextShow title={'开始营业时间：'} content={item.openTime} />
              <View style={style.h60} />
            </View>}
        />

      </ScrollView>
    );
  }
}
