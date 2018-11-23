import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, ScrollView } from 'react-native';

@insertStyle('netBarDay')
export default class Main extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    navigation.getParam('itemId', 'NO-ID')
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: ds.cloneWithRows(['01-4751', '01-4752', '01-4753', '01-4754', '01-4755', '01-4756', '01-4757']),
    };
    // this.handleClick= this.handleClick.bind(this)
  }
  render() {
    return (
      <ScrollView style="container">
        <DataList time={`2018/02/15`} />
        <View style="flex1">
        <ListView 
        dataSource={this.state.data} 
        removeClippedSubviews={false}
        renderRow={(data) => <DataList ids={data}/>} />
        </View>
      
        <View style="border60h" />
      </ScrollView>
   
    )
  }
}
@insertStyle('netBarDay')
class DataList extends Component {
  render() {
    return (
      <View >
        <View style="border60h" />
        <Text style={["list", "f16"]}>{this.props.time || `门店编号：${this.props.ids}`}</Text>
        <View style="border10h" />
        <View style="flexrow">
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>总销售：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>121123</Text>
          </View>
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>总兑奖：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>121123</Text>
          </View>
        </View>
        <View style="border10h" />

        <View style="flexrow">
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>线上销售：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>121123</Text>
          </View>
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>线下销售：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>121123</Text>
          </View>
        </View>
        <View style="border10h" />

        <View style="flexrow">
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>线上兑奖：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>121123</Text>
          </View>
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>线下兑奖：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>121123</Text>
          </View>
        </View>
        <View style="border10h" />
        <View style="flexrow">
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>银行卡充值：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>121123</Text>
          </View>
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>支付宝充值：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>121123</Text>
          </View>
        </View>
        <View style="border10h" />

        <View style="flexrow">
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>微信充值：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>121123</Text>
          </View>
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>取消：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock9"]}>0</Text>
          </View>
        </View>
        <View style="border10h" />

        <View style="flexrow">
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>实退：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock9"]}>0</Text>
          </View>
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>应缴款：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>121123</Text>
          </View>
        </View>
        <View style="border10h" />
      </View>
    );
  }
}

const styles = StyleSheet.create({})