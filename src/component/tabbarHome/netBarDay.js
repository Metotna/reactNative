import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, RefreshControl } from 'react-native';

@insertStyle('netBarDay')
export default class Main extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: ds.cloneWithRows(['01-4751', '01-4752', '01-4753', '01-4754', '01-4755', '01-4756', '01-4757']),
      dataTotal:{},
      dataSource: ds,
      refreshing: false,
      listPage: 1,
      listStatus: 'Loading',
      listReqing: false,
    };
    this.times = navigation.getParam('time');
    this.shopId = navigation.getParam('itemId');
    this.listPageSize = 20
    this._dataSource = [];
    // console.log(this.times)
    // this.handleClick= this.handleClick.bind(this)
  }


  _EndListPush = () => {
    if (this.state.listStatus == 'noMore' || this.state.listReqing) return false
    if (!this._dataSource.length) return
    this.setState({ listReqing: true })
    http.post('/netbar/report/sellList', {
      shopId: this.shopId,
      sDate:this.times,
      eDate:this.times,
      pageNumber: this.state.listPage + 1,
      pageSize: this.listPageSize,
      status:30,
    }).then(res => {
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = this._dataSource.concat(res.data.entitys);
        this.setState({
          listPage: res.data.pageNumber,
          listStatus: listStatus,
          listReqing: false,
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
        })
      }
    }).catch(err => {
      this.setState({ listReqing: false })
    })
  }

  _hanleFooter = () => {
    if (this.state.listStatus == "Loading") {
      return <Text style={{ lineHeight: 35, textAlign: "center", color: "#666" }}>加载中...</Text>
    } else if (this.state.listStatus == "noMore") {
      return <Text style={{ lineHeight: 35, textAlign: "center", color: "#666", marginBottom: 6 }}>暂无更多数据</Text>
    } else {
      return <ActivityIndicator style={{ height: 35 }} />
    }
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true,
      listPage: 1,
    })
    http.post('/netbar/report/sellDetailList', {
      shopId: this.shopId,
      sDate:this.times,
      eDate:this.times,
      pageNumber: 1,
      pageSize: this.listPageSize,
      status:30
    }).then(res => {
      // console.log(res)
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = res.data.entitys;
        this.setState({
          dataTotal:res.data.total,
          refreshing: false,
          listStatus: listStatus,
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
        })
      }
    })
  }

  render() {
    return (
      <ListView style="container"
        dataSource={this.state.dataSource}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
          tintColor="#666666"
          title="Loading..."
          titleColor="#666666"
          colors={['#666666']}
          progressBackgroundColor="#f2f3f5"
        />}
        renderHeader={() => {
          return (
            <DataList time={this.times} data={this.state.dataTotal} />
          )}
        }
        onEndReachedThreshold={30}
        onEndReached={this._EndListPush}
        renderFooter={this._hanleFooter}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderRow={(rowData) => (
          <DataList data={rowData}/>
        )} />
    )
  }
  componentWillMount() {
    this._onRefresh()
  }
}


@insertStyle('netBarDay')
class DataList extends Component {
  render() {
    return (
      <View >
        <View style="border60h" />
        <Text style={["list", "f16"]}>{this.props.time || `门店编号：${this.props.data.sn}`}</Text>
        <View style="border10h" />
        <View style="flexrow">
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>总销售：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>{this.props.data.allSell||0}</Text>
          </View>
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>总兑奖：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>{this.props.data.allBonus||0}</Text>
          </View>
        </View>
        <View style="border10h" />

        <View style="flexrow">
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>线上销售：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>{this.props.data.onlineSell||0}</Text>
          </View>
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>线下销售：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>{this.props.data.offlineSell||0}</Text>
          </View>
        </View>
        <View style="border10h" />

        <View style="flexrow">
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>线上兑奖：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>{this.props.data.onlineBonus||0}</Text>
          </View>
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>线下兑奖：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>{this.props.data.offlineBonus||0}</Text>
          </View>
        </View>
        <View style="border10h" />
        <View style="flexrow">
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>银行卡充值：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>{this.props.data.bankCharge||0}</Text>
          </View>
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>支付宝充值：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>{this.props.data.aliCharge||0}</Text>
          </View>
        </View>
        <View style="border10h" />

        <View style="flexrow">
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>微信充值：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>{this.props.data.wxCharge||0}</Text>
          </View>
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>取消：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock9"]}>{this.props.data.cancel||0}</Text>
          </View>
        </View>
        <View style="border10h" />

        <View style="flexrow">
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>实退：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock9"]}>{this.props.data.refund||0}</Text>
          </View>
          <View style={["list", "flex1", "flexrow"]}>
            <Text style={["w88", 'f14', "fblock9"]}>应缴款：</Text>
            <Text style={["flex1", 'f14', "tAlignR", "fblock3"]}>{this.props.data.payment||0}</Text>
          </View>
        </View>
        <View style="border10h" />
      </View>
    );
  }
}

const styles = StyleSheet.create({})