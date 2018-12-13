
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, RefreshControl, ActivityIndicator, DeviceEventEmitter, SectionList } from 'react-native';
import { Button, Tabs } from 'antd-mobile-rn'
import { MachineInfo, InfoDetail } from '../tabbarReport/component/machineInfo';
import Tab from '../common/tabs'

@insertStyle('')
export default class Main extends Component {

  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      //dataSource: ds.cloneWithRows([{ times: '2018.10.15', child: [1, 2, 3] }, { times: '2018.10.15', child: [1,] }, { times: '2018.10.15', child: [] }, { times: '2018.10.15', child: [2, 2, 2] }]),
      dataSource: ds,
      dataSource2: [],
      refreshing: false,
      listStatus: 'Loading',
      listReqing: false,
      listPage: 1,
      status: `10,15`,
      statusDesc: 'load',
    };
    this._dataSource = [];
    this.listPageSize = 30;
    this._data = {
      load: [],
      ing: [],
      all: [],
    }
  }
  //rende之后调用
  componentWillMount() {
    this.Emitter = DeviceEventEmitter.addListener('refreshSellDetailList', (data) => {
      console.log(data)
      if (data == 'suc') {
        this._onRefresh();
        DeviceEventEmitter.emit('refreshHomeStore', 'refresh')
      }
    })
  }

  componentWillUnmount() {
    this.Emitter.remove();
    /* 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。 */
  }

  componentDidMount() {
    this._onRefresh()
  }

  /* 数据处理 */
  _dataHandle(data, source) {
    let res = source || []
    for (var i = 0; i < data.length; i++) {
      let d = data[i]
      if (res.length == 0) {
        res.push({
          key: d.dateMemo,
          dateMemo: d.dateMemo,
          data: [d]
        })
      } else {
        if (res[res.length - 1].dateMemo == d.dateMemo) {
          res[res.length - 1].data.push(d)
        } else {
          res.push({
            key: d.dateMemo,
            dateMemo: d.dateMemo,
            data: [d]
          })
        }
      }
    }
    return res
  }

  _tabChange = (val) => {
    this.setState({
      status: val.type || "",
      statusDesc: val.desc,
      listPage: 1,
      dataSource: this.state.dataSource.cloneWithRows([]),
      dataSource2:[]
    })
    // console.log(this.state.dataSource)
    this._onRefresh(val.type)
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
        source: data,
      });
    }
  }

  _onRefresh = (status) => {
    // console.log(`_onRefresh`)
    this.setState({
      refreshing: true,
      listPage: 1,
      listStatus: "Loading",
    })
    let obj = {
      status: status || this.state.status,
      pageNumber: 1,
      pageSize: this.listPageSize,
    }
    if (status == 30) {
      obj.status = ""
      this.setState({ status: "" })
    }
    http.post('/netbar/report/sellDetailList', obj).then(res => {
      // console.log(res)
      if (res && res.status == 200) {
        var listStatus = res.data.totalPage == 1 ? "noMore" : "goOn";
        this._dataSource = this._dataHandle(res.data.entitys)
        this._data[this.state.statusDesc] = this._dataSource;
        this.setState({
          refreshing: false,
          listStatus: listStatus,
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource),
          dataSource2: this._dataSource,
        })
      }
    }).catch(err => {
      this.setState({
        refreshing: false,
        listPage: 1,
        listStatus: "noMore",
      })
    })
  }

  _onEndReached = () => {
    // console.log(`_onEndReached`)
    if (this.state.listStatus == 'noMore' || this.state.listReqing) return false
    if (!this._dataSource.length) return
    this.setState({ listReqing: true })
    http.post('/netbar/report/sellDetailList', {
      status: this.state.status,
      pageNumber: this.state.listPage + 1,
      pageSize: this.listPageSize,
    }).then(res => {
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = this._dataHandle(res.data.entitys, this._dataSource)
        this.setState({
          listPage: res.data.pageNumber,
          listStatus: listStatus,
          listReqing: false,
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource),
          dataSource2: this._dataSource,
        })
      }
    }).catch(err => {
      this.setState({ listReqing: false })
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

  render() {
    const tabs = [
      { title: '待上传', type: '10,15', desc: "load" },
      { title: '审核中', type: '20', desc: "ing" },
      { title: '全部', type: '30', desc: "all" },
    ]

    //   <ListView style='flex1'
    //   dataSource={this.state.dataSource}
    //   refreshControl={
    //     <RefreshControl
    //       refreshing={this.state.refreshing}
    //       onRefresh={this._onRefresh}
    //       tintColor="#666666"
    //       title="Loading..."
    //       titleColor="#666666"
    //       colors={['#666666']}
    //       progressBackgroundColor="#f2f3f5"
    //     />
    //   }
    //   onEndReached={this._onEndReached}
    //   onEndReachedThreshold={30}
    //   enableEmptySections={true}
    //   removeClippedSubviews={false}
    //   renderRow={(rowData) => (<MachineInfo data={rowData} />)}
    //   renderFooter={this._renderFooter}
    // <InfoDetails rowData={item} type={item.status}  />
    // />
    return (
      <View style="container">
        <View style={{ height: 35 }}>
          <Tab tabs={tabs} onChange={this._tabChange} />
        </View>
        <SectionList
          style="flex1"
        removeClippedSubviews={false}
          keyExtractor={(item, index) => index}
          sections={this.state.dataSource2}
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this._renderFooter}
          renderItem={({ item, index, section }) =><InfoDetail rowData={item} types={item.status} index={index} onPress={this._ButtonRouter}/>  }
          renderSectionHeader={({ section }) =>
            <View style={{height:35,justifyContent:"center",paddingLeft:11,backgroundColor: "#DCDFE6"}}>
              <Text style={{fontSize:16,color:"#333",}}>{section.dateMemo}</Text>
            </View>}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({

});