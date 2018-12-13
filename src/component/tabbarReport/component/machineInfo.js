import React, { Component } from 'react';
import { FlatList, Text, ListView, View, } from 'react-native';
import { withNavigation } from 'react-navigation';
import Button from '../../common/buttonplat'


@insertStyle('ReportInfo')
class Main extends Component {
  constructor(props) {
    super(props);
    const data = this.props.data || {}
    this.state = {
      dataSource: data.child,
      time: data.dateMemo || '',
      // dataSource: ds.cloneWithRows(data.child || []),
      value: '',
    };
  }
  // style={["container", "sss"]}
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
        source: data,
      });
    }
  }
  render() {
    return (
      <View style={{ marginTop:4 }}>
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
export class InfoDetail extends Component {
  constructor(props) {
    super(props);
    const t = this.props.types;
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
      btnt = "重新上传"
    } else if (t == 30){
      tt = "通过";
      btnt = "查 看"
    }
    this.state = {
      data: this.props.rowData,
      type: this.props.types,
      title: tt || '',
      btnText: btnt || '',
    }
  }
  _btnRouter = () => {
    this.props.onPress(this.props.rowData)
  }

  render() {
    return (
      <View >
        <View style={["flexrow", "rbgc"]}>
          <View style={["JCC", "h25", "flex2"]}>
            <Text style={["f16", "fblock3", "tAlignL"]}>{this.state.data.sn}</Text>
          </View>
          <View style={["JCC", "h25", "flex1"]}>
            <Text style={["f16", "fblock3", "tAlignC"]}>{this.state.title}</Text>
          </View>
          <View style={{ flex: 2, alignItems: "flex-end" }}>
            <Button style={{ width: 70, height: 25 }} textStyle={{ fontSize: 12, }} title={this.state.btnText} onPress={this._btnRouter} />
          </View>
        </View>

        {
          this.state.type != 10
            ?
            <View style={["flexrow", "rinfo"]}>
              <View style={["flex1", "rinfo"]}>
              <View style="border10h" />

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
              <View style="border10h" />

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
              <View style="border10h" />

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

export const MachineInfo = withNavigation(Main)
