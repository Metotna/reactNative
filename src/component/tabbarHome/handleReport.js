
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, ActivityIndicator, RefreshControl, FlatList, Dimensions, Image, TouchableHighlight, DeviceEventEmitter, Linking, SectionList, TouchableOpacity } from 'react-native';
import { PickerView, Toast, Modal, Picker, List } from 'antd-mobile-rn'
import Tab from '../common/tabs'
import ViewAudit from './component/handleReportAudit'
import Icon from 'react-native-vector-icons/FontAwesome'
// const Dheight = Dimensions.get('window').height


@insertStyle('HandleReport')
class ViewUpload extends Component {
  constructor(props) {
    super(props);
    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => return r1 !== r2},});
    this._dataSource = []
    this.state = {
      // dataSource: ds,
      dataSource2: [],
      refreshing: false,
      listPage: 1,
      listReqing: false,
      listStatus: 'Loading',
    };
    this.listPageSize = 30
  }
  componentDidMount() {
    this._onRefresh()
  }

  _hanleDate(data, sourse) {
    if (!data) return []
    let _Ary = sourse || []
    for (var i = 0; i < data.length; i++) {
      let d = data[i]
      if (!_Ary.length) {
        _Ary.push({
          key: d.shopId,
          shopId: d.shopId,
          shop: d.shop,
          shopPhone: d.shopPhone,
          data: [{
            dateMemo: d.dateMemo,
            sn: d.sn
          }]
        })
      } else {
        let l = _Ary[_Ary.length - 1]
        if (l.shopId == d.shopId) {
          if (l.data[l.data.length - 1].dateMemo == d.dateMemo) {
            l.data[l.data.length - 1].sn = l.data[l.data.length - 1].sn + ',' + d.sn
          } else {
            l.data.push({
              dateMemo: d.dateMemo,
              sn: d.sn
            })
          }
        } else {
          _Ary.push({
            key: d.shopId,
            shopId: d.shopId,
            shop: d.shop,
            shopPhone: d.shopPhone,
            data: [{
              dateMemo: d.dateMemo,
              sn: d.sn
            }]
          })
        }
      }
    }
    return _Ary
  }

  _onRefresh = () => {
    // console.log(`_onRefresh`)
    this.setState({
      refreshing: true,
      listPage: 1,
      listStatus: 'Loading',
    })
    this._dataSource = [];
    http.post('/netbar/report/sellDetailList', {
      status: "10,15",
      pageNumber: 1,
      pageSize: this.listPageSize,
    }).then(res => {
      // console.log(`promise _onRefresh 当前时间：` + (new Date().getTime() - 1544400000000))
      if (res && res.status == 200) {
        var listStatus = res.data.totalPage == 1 ? "noMore" : "goOn";
        this._dataSource = this._hanleDate(res.data.entitys)
       console.log(` this._dataSource`)
        this.setState({
          listPage: 1,
          refreshing: false,
          listStatus: listStatus,
          // dataSource: this.state.dataSource.cloneWithRows(this._dataSource),
          dataSource2: this._dataSource,

        })
      }
    })
  }

  _onEndReached = () => {
    if (this.state.listStatus == 'noMore' || this.listReqing) return
    this.state.listReqing = true;
    // console.log(`请求中：` + this.state.listPage, `_dataSource:` + this._dataSource.length,`页面状态：`+this.state.listStatus)
    http.post('/netbar/report/sellDetailList', {
      status: `10,15`,
      pageNumber: this.state.listPage + 1,
      pageSize: this.listPageSize,
    }).then(res => {
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = this._hanleDate(res.data.entitys, this._dataSource)
        // console.log(this._dataSource)
        this.setState({
          dataSource2: this._dataSource,
          listStatus: listStatus,
          // dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
        })
        this.state.listReqing = false;
        this.state.listPage = res.data.pageNumber;
      }
    }).catch(err => {
      this.state.listReqing = false;
    })
  }

  _renderFooter = () => {
    if (this.state.listStatus == "Loading") {
      return <View style={{ height: 35, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", color: "#666" }}>加载中...</Text>
      </View>
    } else if (this.state.listStatus == "noMore") {
      return <View style={{ height: 35, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", color: "#666" }}>暂无更多数据</Text>
      </View>
    } else {
      return <ActivityIndicator style={{ height: 35 }} />
    }
  }

  _iconPhone = (phone) => {
    if (!phone) return
    let strPhone = "tel:" + phone;
    Linking.openURL(strPhone);
  }

  render() {
    const style = {
      up_title: {
        backgroundColor: "#F3F3F3",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 18,
        paddingRight: 6,
      },
      t_text: {
        justifyContent: "center",
      },
      t_img: {
        height: 36,
        width: 36,
      }
    }
    return (
      <SectionList
        style="tab_list"
        keyExtractor={(item, index) => index}
        sections={this.state.dataSource2}
        onRefresh={this._onRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={this._renderFooter}
        renderItem={({ item, index, section }) => <ViewUploadList data={item} />}
        renderSectionHeader={({ section }) =>
          <View style={style.up_title}>
            <View style={style.t_text}><Text style={{ fontSize: 16, color: "#333" }}>{section.shop}</Text></View>
            <TouchableHighlight onPress={() => this._iconPhone(section.shopPhone)} underlayColor="#fff">
              <Image style={style.t_img} source={require('../../assets/image/img/tell.png')} /></TouchableHighlight>
          </View>}
      />
    )
  }
}

@insertStyle('HandleReport')
class ViewUploadList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View style={["flexrow"]}>
          <Text style={["up_text", "up_list", "fblock3","w130"]}>{this.props.data.dateMemo}</Text>
          <View style="border10" />
          <Text style={["up_text", "up_list", "flex1", "fblock3"]}>{this.props.data.sn}</Text>
        </View>
        <View style="border10h" />
      </View>
    )
  }
}

@insertStyle('HandleReport')
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStatus: 20,
    };
    this.dataSource = [];
  }

  _tabChange = (val) => {
    this.setState({ dataStatus: val.type })
  }

  _saveDataSource = (val) => {
    this.dataSource = val;
  }

  render() {
    const tabs = [
      { title: '待审核', type: 20 },
      { title: '未上传', type: 10 },
    ];
    return (
      <View style='container'>
        <View style={{ height: 35 }}>
          <Tab tabs={tabs} onChange={this._tabChange} />
          {/* <Tabs tabs={tabs} initialPage={0} tabBarUnderlineStyle={{ backgroundColor: "#E7505A" }} tabBarActiveTextColor="#E7505A" onChange={this._tabChange} tabBarInactiveTextColor="#666666"></Tabs> */}
        </View>
        <View style="border10h" />
        <View style='tab_list'>
          {
            this.state.dataStatus == 20
              ? <ViewAudit ref='audit' />
              : <ViewUpload ref='upload' save={this._saveDataSource} data={this.dataSource} />
          }
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});