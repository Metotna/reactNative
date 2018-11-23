import React, { Component } from 'react';
import { StyleSheet, Text, ListView, View, } from 'react-native';
import { withNavigation } from 'react-navigation';
import Button from '../../common/button'


@insertStyle('ReportInfo')
class Main extends Component {
  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const data = this.props.data || {}
    this.state = {
      time: data.times || '',
      dataSource: ds.cloneWithRows(data.child || []),
      value: '',
      name1: this.props.total ? '' : '销售:',
      name2: this.props.total ? '' : '兑奖:',
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
  _ButtonRouter = (type, order) => {
    /* 1 待上传 2 审核中 3 驳回  4 通过 */
    if (type == 1) {
      console.log(`立即上传，待开发`)
    } else {
      this.props.navigation.navigate('Examine', {
        itemId: 86,
        otherParam: 'anything you want here',
      });

    }
  }
  render() {
    return (
      <View>
        <Text style={["rtitle", "fblock3"]}>{this.state.time}</Text>
        <ListView
          dataSource={this.state.dataSource}
          removeClippedSubviews={false}
          enableEmptySections={true}
          renderRow={(data) => <InfoDetail type={data} onPress={this._ButtonRouter} />} />
      </View>
    );
  }
}

@insertStyle('ReportInfo')
class InfoDetail extends Component {
  constructor(props) {
    super(props);
    const t = this.props.type;
    let tt, btnt
    if (t == 1) {
      tt = "未上传";
      btnt = "立即上传"
    } else if (t == 2) {
      tt = "审核中";
      btnt = "查 看"
    } else if (t == 3) {
      tt = "驳回";
      btnt = "查 看"
    } else if (t == 4) {
      tt = "通过";
      btnt = "查 看"
    }
    this.state = {
      type: this.props.type,
      title: tt || '',
      btnText: btnt || '',
    }
  }
  _btnRouter = () => {
    this.props.onPress(this.props.type)
  }

  render() {
    /* 1 待上传 2 审核中 3 驳回  4 通过 */

    return (
      <View >
        {
          this.state.type
            ?
            <View style={["flexrow", "rbgc"]}>
              <Text style={["f16", "fblock3", "flex2", "rt_id", "tAlignL", "aSelf"]}>机器编号-001</Text>
              <Text style={["f16", "fblock3", "flex1", "rt_id", "tAlignC", "aSelf"]}>{this.state.title}</Text>
              <View style={{ flex: 2, alignItems: "flex-end" }}>
                <Button style={{ width: 70 }} textStyle={{ fontSize: 12, lineHeight: 13 }} title={this.state.btnText} onPress={this._btnRouter} />
              </View>
            </View>
            :
            null
        }
        {
          this.state.type != 1
            ?
            <View style={["flexrow", "rinfo"]}>
              <View style={["flex1", "rinfo"]}>
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>总售：</Text>
                  <Text style={["f13h18", "fblock3"]}>8888.88</Text>
                </View>
                <View style="border10h" />
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>总兑：</Text>
                  <Text style={["f13h18", "fblock3"]}>8888.88</Text>
                </View>
                <View style="border10h" />
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>银行卡：</Text>
                  <Text style={["f13h18", "fblock3"]}>8888.88</Text>
                </View>
              </View>
              <View style="border10" />
              <View style={["flex1", "rinfo"]}>
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>线上：</Text>
                  <Text style={["f13h18", "fblock3"]}>8888.88</Text>
                </View>
                <View style="border10h" />
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>线上：</Text>
                  <Text style={["f13h18", "fblock3"]}>8888.88</Text>
                </View>
                <View style="border10h" />
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>支付宝：</Text>
                  <Text style={["f13h18", "fblock3"]}>8888.88</Text>
                </View>
              </View>
              <View style="border10" />
              <View style={["flex1", "rinfo"]}>
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>线下：</Text>
                  <Text style={["f13h18", "fblock3"]}>8888.88</Text>
                </View>
                <View style="border10h" />
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>线下：</Text>
                  <Text style={["f13h18", "fblock3"]}>8888.88</Text>
                </View>
                <View style="border10h" />
                <View style={["ri_cot", "flexrowbet",]}>
                  <Text style={["f13h18", "fblock9"]}>微信：</Text>
                  <Text style={["f13h18", "fblock3"]}>8888.88</Text>
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