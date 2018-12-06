
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, RefreshControl, ActivityIndicator } from 'react-native';
import { Button, Tabs } from 'antd-mobile-rn'
import MachineInfo from '../tabbarReport/component/machineInfo';
import Tab from '../common/tabs'

@insertStyle('')
export default class Main extends Component {

  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) =>  r1!==r2 });
    this.state = {
      //dataSource: ds.cloneWithRows([{ times: '2018.10.15', child: [1, 2, 3] }, { times: '2018.10.15', child: [1,] }, { times: '2018.10.15', child: [] }, { times: '2018.10.15', child: [2, 2, 2] }]),
      dataSource: ds,
      refreshing: false,
      listStatus: 'Loading',
      listReqing: false,
      listPage: 1,
      status: 10,
      statusDesc: 'load',
    };
    this._dataSource = [];
    this.listPageSize = 20;
    this._data = {
      load: [],
      ing: [],
      all: [],
    }
  }
  //rende之后调用
  // componentDidMount() {
  //   console.log(32333)
  //   // this.dopost();
  // }
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
          dateMemo: d.dateMemo,
          child: [d]
        })
      } else {
        if (res[res.length - 1].dateMemo == d.dateMemo) {
          res[res.length - 1].child.push(d)
        } else {
          res.push({
            dateMemo: d.dateMemo,
            child: [d]
          })
        }
      }
    }
    return res
  }

  _tabChange = (val) => {
    this.setState({
      status: val.type,
      statusDesc: val.desc,
      listPage: 1,
      listStatus: 'loading',
      dataSource: this.state.dataSource.cloneWithRows([]),
    })
    // console.log(this.state.dataSource)

    this._onRefresh(val.type)
  }
  _onRefresh = (status) => {
    this.setState({
      refreshing: true,
      listPage: 1,
    })
    // console.log(`refresh`,this.state.status,this.state.statusDesc)
    http.post('/netbar/report/sellDetailList', {
      status: status||this.state.status,
      pageNumber: 1,
      pageSize: this.listPageSize,
    }).then(res => {
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = this._dataHandle(res.data.entitys)
        console.log(this._dataSource)
        this._data[this.state.statusDesc] = this._dataSource;
        this.setState({
          refreshing: false,
          listStatus: listStatus,
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
        })
      }
    })
  }

  _onEndReached = () => {
    // console.log(`_onEndReached`,this.state.status,this.state.listStatus)
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
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
        })
      }
    }).catch(err => {
      this.setState({ listReqing: false })
    })
  }

  _renderFooter = () => {
    if (this.state.listStatus == "Loading") {
      // return <Text style={{ lineHeight: 35, textAlign: "center", color: "#666" }}>加载中...</Text>
    } else if (this.state.listStatus == "noMore") {
      return <Text style={{ lineHeight: 35, textAlign: "center", color: "#666" }}>暂无更多数据</Text>
    } else {
      return <ActivityIndicator style={{ height: 35 }} />
    }
  }



  render() {
    const tabs = [
      { title: '待上传', type: '10', desc: "load" },
      { title: '审核中', type: '20', desc: "ing" },
      { title: '全部', type: '', desc: "all" },
    ]
    return (

      <View style="container">
        <View style={{ height: 42 }}>
      <Tab tabs={tabs} onChange={this._tabChange} />         
       {/* <Tabs
            initialPage={0}
            tabBarUnderlineStyle={{ backgroundColor: "#E7505A" }}
            
            tabBarActiveTextColor="#E7505A"
            tabBarInactiveTextColor="#666666">
          </Tabs> */}
        </View>

        <ListView style='flex1'
          dataSource={this.state.dataSource}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor="#666666"
              title="Loading..."
              titleColor="#666666"
              colors={['#666666']}
              progressBackgroundColor="#f2f3f5"
            />
          }
          onEndReached={this._onEndReached}
          onEndReachedThreshold={30}
          enableEmptySections={true}
          removeClippedSubviews={false}
          renderRow={(rowData) => (<MachineInfo data={rowData} />)}
          renderFooter={this._renderFooter}
        />

      </View>
    );
  }

}

const styles = StyleSheet.create({

});