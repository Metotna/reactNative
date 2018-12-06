import React, { Component } from 'react';
import { FlatList, Text, ListView, View, } from 'react-native';
import { withNavigation } from 'react-navigation';
import Button from '../../common/button'


@insertStyle('ReportInfo')
class Main extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.data)
    // this.handleClick= this.handleClick.bind(this)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const data = this.props.data || {}
    // this.dataSource = data.child
    this.state = {
      dataSource:data.child,
      time: data.dateMemo || '',
      // dataSource: ds.cloneWithRows(data.child || []),
      value: '',
    };
  }
  // style={["container", "sss"]}
  _onPressButton = () => {
    this.props.navigation.navigate('NetBarDetail', {
      itemId: 86,
      otherParam: 'anything you want here',
      title: this.props.name,
    });
    // DetailList
    console.log(`table touch`)
  }
  iconPhone = () => {
    console.log(`call phone1111`)
  }
  _ButtonRouter = (data) => {
    // return
    /* 10 待上传 15 审核中 20 驳回  30 通过 */
    if (data.status == 10) {
      this.props.navigation.navigate('uploadreport', {
        pdata: data,
        path: 't'
      });
    } else {
      this.props.navigation.navigate('Examine', {
        source:data,
      });
    }
  }
  render() {
    return (
      <View>
        <Text style={["rtitle", "fblock3"]}>{this.state.time}</Text>
        <FlatList data={this.state.dataSource}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <InfoDetail rowData={item} type={item.status} onPress={this._ButtonRouter} />}
        />
      </View>
    );
  }
}

@insertStyle('ReportInfo')
class InfoDetail extends Component {
  constructor(props) {
    super(props);
    const t = this.props.type;
    // er	@mock=10待上传,15审核失败,20待审核,30审核成功
    let tt, btnt
    if (t == 10) {
      tt = "未上传";
      btnt = "立即上传"
    } else if (t == 20) {
      tt = "审核中";
      btnt = "查 看"
    } else if (t == 15) {
      tt = "驳回";
      btnt = "查 看"
    } else {
      tt = "通过";
      btnt = "查 看"
    }
    this.state = {
      data: this.props.rowData,
      type: this.props.type,
      title: tt || '',
      btnText: btnt || '',
    }
  }
  _btnRouter = () => {
    console.log(111222)
    this.props.onPress(this.props.rowData)
  }

  render() {
    /* 1 待上传 2 审核中 3 驳回  4 通过 */

    return (
      <View >

        <View style={["flexrow", "rbgc"]}>
          <Text style={["f16", "fblock3", "flex2", "rt_id", "tAlignL", "aSelf"]}>{this.state.data.sn}</Text>
          <Text style={["f16", "fblock3", "flex1", "rt_id", "tAlignC", "aSelf"]}>{this.state.title}</Text>
          <View style={{ flex: 2, alignItems: "flex-end" }}>
            <Button style={{ width: 70 }} textStyle={{ fontSize: 12, lineHeight: 13 }} title={this.state.btnText} onPress={this._btnRouter} />
          </View>
        </View>

        {
          this.state.type != 10
            ?
            <View style={["flexrow", "rinfo"]}>
              <View style={["flex1", "rinfo"]}>
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>总售：</Text>
                  <Text style={["f13h18", "fblock3"]}>{this.state.data.allSell}</Text>
                </View>
                <View style="border10h" />
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>总兑：</Text>
                  <Text style={["f13h18", "fblock3"]}>{this.state.data.allBonus}</Text>
                </View>
                <View style="border10h" />
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>银行卡：</Text>
                  <Text style={["f13h18", "fblock3"]}>{this.state.data.bankCharge}</Text>
                </View>
              </View>
              <View style="border10" />
              <View style={["flex1", "rinfo"]}>
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>线上：</Text>
                  <Text style={["f13h18", "fblock3"]}>{this.state.data.onlineSell}</Text>
                </View>
                <View style="border10h" />
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>线上：</Text>
                  <Text style={["f13h18", "fblock3"]}>{this.state.data.onlineBonus}</Text>
                </View>
                <View style="border10h" />
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>支付宝：</Text>
                  <Text style={["f13h18", "fblock3"]}>{this.state.data.aliCharge}</Text>
                </View>
              </View>
              <View style="border10" />
              <View style={["flex1", "rinfo"]}>
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>线下：</Text>
                  <Text style={["f13h18", "fblock3"]}>{this.state.data.offlineSell}</Text>
                </View>
                <View style="border10h" />
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>线下：</Text>
                  <Text style={["f13h18", "fblock3"]}>{this.state.data.offlineBonus}</Text>
                </View>
                <View style="border10h" />
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>微信：</Text>
                  <Text style={["f13h18", "fblock3"]}>{this.state.data.wxCharge}</Text>
                </View>
              </View>
            </View>
            :
            null
        }
        <View style="border10_f" />
      </View >
    )
  }
}


export default withNavigation(Main)