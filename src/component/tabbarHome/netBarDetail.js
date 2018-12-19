import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, RefreshControl, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import { onlineOffShow } from "../../config"


@insertStyle('netBarDetail')
class Main extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      refreshing: false,
      listPage: 1,
      listStatus: 'Loading',
      listReqing: false,
    };
    const { navigation } = this.props;
    this.shopId = navigation.getParam('shopId');
    this.title = navigation.getParam('title');
    this.listPageSize = 20
    this._dataSource = [];
  }

  _EndListPush = () => {
    if (this.state.listStatus == 'noMore' || this.state.listReqing) return false
    if (!this._dataSource.length) return
    this.setState({ listReqing: true })
    http.post('/netbar/report/sellList', {
      shopId: this.shopId,
      timeLevel: 'day',
      pageNumber: this.state.listPage + 1,
      pageSize: this.listPageSize,
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
      //   return <View style={{height:35,justifyContent:"center"}}>
      //  <Text style={{  textAlign: "center", color: "#666" }}>加载中...</Text>
      //   </View>
    } else if (this.state.listStatus == "noMore") {
      return <View style={{ height: 35, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", color: "#666" }}>暂无更多数据</Text>
      </View>
    } else {
      return <ActivityIndicator style={{ height: 35 }} />
    }
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true,
      listPage: 1,
    })
    http.post('/netbar/report/sellList', {
      shopId: this.shopId,
      timeLevel: 'day',
      pageNumber: 1,
      pageSize: this.listPageSize,
    }).then(res => {
      // console.log(res)
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = res.data.entitys;
        this.setState({
          refreshing: false,
          listStatus: listStatus,
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
        })
      }
    })
  }

  render() {
    return (
      <View style="container">
        <View style={["flexrow", "content"]}>
          <Text style={["flex1", "f14h30", "tAlignL", "fblock3"]}>日期</Text>
          <Text style={["flex1", "f14h30", "tAlignR", "fblock3"]}>线上销售额</Text>
          <Text style={["flex1", "f14h30", "tAlignR", "fblock3"]}>线下销售额</Text>
          <Text style={["flex1", "f14h30", "tAlignR", "fblock3"]}>总销售额</Text>
        </View>
        <View style="border10h" />
        <View style={["flex1",]}>
          <ListView
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
            onEndReachedThreshold={30}
            onEndReached={this._EndListPush}
            renderFooter={this._hanleFooter}
            removeClippedSubviews={false}
            enableEmptySections={true}
            renderRow={(rowData, a, index) => (
              <View style={index % 2 ? ss.listCotOdd : ss.listCotEven}>
                <Text style={[ss.flexText, ss.tul]} onPress={() => this.props.navigation.navigate('NetBarDay', {
                  time: rowData.dateMemo,
                  title: this.title,
                  shopId: this.shopId
                })}>{rowData.dateMemo}</Text>
                <Text style={[ss.flexText, ss.tAr, ss.tgreen]}>{onlineOffShow?rowData.onlineSell:"--"}</Text>
                <Text style={[ss.flexText, ss.tAr, ss.tblue]}>{onlineOffShow?rowData.offlineSell:"--"}</Text>
                <Text style={[ss.flexText, ss.tAr]}>{rowData.allSell}</Text>
              </View>
            )} />
          <View style="border10h" />

        </View>
      </View>
    )
  }
  componentWillMount() {
    this._onRefresh()
    // console.log(`first Refresh`)
  }
  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    this.shopId = navigation.getParam('shopId');
    this._onRefresh()
  }
}
export default withNavigation(Main)
const ss = StyleSheet.create({
  icon: {
    marginLeft: 5,
  },
  listCotOdd: {
    flexDirection: "row",
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: "#F3F3F3"
  },
  listCotEven: {
    flexDirection: "row",
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: "#ffffff"
  },
  flexText: {
    flex: 1,
    fontSize: 14,
    height: 30,
    color: '#333333',
  },
  tAr: {
    textAlign: "right"
  },
  tgreen: {
    color: "#6DC3C4"
  },
  tblue: {
    color: "rgba(17,79,205,1)"
  },
  tul: {
    textDecorationLine: "underline"
  }
})