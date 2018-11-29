
import React, { Component } from 'react';
import { StyleSheet, Text, View, RefreshControl, ListView, ActivityIndicator, ScrollView, TouchableHighlight, Alert } from 'react-native';
import Echarts from 'native-echarts';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from '../../util/redux/action/user';

import ListHearder from '../tabbarHome/component/homeStoreListHearder'
import DateTable from '../tabbarHome/component/dateTable'

@insertStyle('TabbarHomeStyle')
class Main extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      refreshing: false,
      baseData: {},
      echart: false,
      echartDate: {
        online: [],
        offline: [],
        xAxis: [],
      },
      listStatus: 'Loading',
      listReqing: false,
      listPage: 1,
      dataSource: ds,
    };
    this._dataSource = [];
    this.listPageSize = 20;
  }

  _onPressButton = () => {
  }

  _EndListPush = () => {
    // console.log(`add data`, this.state.listReqing, this.state.listStatus)
    if (this.state.listStatus == 'noMore' || this.state.listReqing) return false
    if (!this._dataSource.length) return
    this.setState({ listReqing: true })
    http.post('/netbar/report/sellList', {
      timeLevel: 'DAY',
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
      return <Text style={{ lineHeight: 35, textAlign: "center", color: "#666" }}>加载中...</Text>
    } else if (this.state.listStatus == "noMore") {
      return <Text style={{ lineHeight: 35, textAlign: "center", color: "#666" }}>暂无更多数据</Text>
    } else {
      return <ActivityIndicator style={{ height: 35 }} />
    }
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true,
      echart: false,
      listPage: 1,
    })
    // console.time("Refresh")
    http.post('/netbar/report/overView', {}).then(res => {
      if(res && res.status == 200){
        this.setState({
          baseData: res.data,
        })
        return http.post('/netbar/report/sellList', {
          timeLevel: 'WEEK',
          pageNumber: 1,
          pageSize: 7,
        })
      }
    }).then(res => {
        if (res && res.status == 200) {
          let online = []
          let offline = []
          let xAxis = []
          for(var x in res.data.entitys){
            let t = res.data.entitys[x]
            online.push(t.onlineSell)
            offline.push(t.offlineSell)
            xAxis.push(t.dateMemo)
          }
          this.setState({
            echart: true,
            echartDate: {online,offline,xAxis}
          })
          return http.post('/netbar/report/sellList', {
            timeLevel: 'DAY',
            pageNumber: 1,
            pageSize: this.listPageSize,
          })
        }
    
    }).then(res => {
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = res.data.entitys;
        this.setState({
          listStatus: listStatus,
          listPage: res.data.pageNumber,
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource),
          refreshing: false,
        })
      }
    }).catch(err => {
      this.setState({
        refreshing: false,
      })
    })
  }
  _echartOption = () => {
    var option = {
      title: {
        text: '销售金额趋势图',
        textStyle: {
          fontSize: 15,
        },
        // top: '5%',
        left: '3%',
      },
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      //     type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      //   }
      // },
      color: ['rgba(17,79,205,.7)', 'rgba(61,175,177,.7)',],
      legend: {
        textStyle: {
          fontSize: 12,
          lineHeight: 25,
        },
        data: ['线上', "线下"],
        selectedMode: false,
        // top: '5%',
        right: '5%',
        // align:'right'
      },
      grid: {
        // show:true,
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '13%',
        // borderWidth:10,
      },
      xAxis: {
        show: true,
        type: 'category',
        boundaryGap: true,
        data: this.state.echartDate.xAxis,
        axisLabel: {
          fontSize: 14,
          // interval: 0,
          // formatter: function (value, index) {
          //   console.log(value)
          //   var date = new Date(value);
          //   var texts = [(date.getMonth() + 1), date.getDate()];
          //   if (index === 0) {
          //     texts.unshift(date.getYear());
          //   }
          //   return value.split('-')[0];
          // }
        }
      },
      yAxis: {
        // nameGap:100,
        // boundaryGap: [0, '10%'],
        splitNumber: 4,
        axisLabel: {
          fontSize: 20,
          color: '#666666',
        },
        show: false,
        axisLine: {
          lineStyle: {
            width: 0
          }
        },
        splitLine: {
          lineStyle: {
            width: 3
          }
        }
      },
      // animation: false,
      series: [
        /* 从下往上 填充。 */
        {
          name: '线下',
          type: 'bar',
          stack: '总量',
          data: this.state.echartDate.offline,
          itemStyle: {
            normal: {
              color: 'rgba(17,79,205,.7)',
              label: {
                show: true,
                position: 'inside',
                textStyle: {
                  fontSize: 10
                }
              }
            }
          },
        },
        {
          name: '线上',
          type: 'bar',
          stack: '总量',
          data: this.state.echartDate.online,
          itemStyle: {
            normal: {
              color: 'rgba(61,175,177,.7)',
              label: {
                show: true,
                position: 'inside',
                // formatter: (params)=> {
                //   // console.log(myChartsetOption.series[0])
                //   return params.value
                //   // return myChartsetOption.series[0].data[params.dataIndex]
                //   // params.dataIndex
                //   // for (var i = 0; i < 7; i++) {
                //   //   if (myChartsetOption.xAxis[0].data[i] == params.name) {
                //   //     return myChartsetOption.series[0].data[i] + params.value;
                //   //   }
                //   // }
                // },
                textStyle: {
                  fontSize: 10
                }
              }
            }
          },
        },

      ],
      textStyle: {
        // fontFamily: 'Arial, Verdana, sans-serif',
        // fontFamily: 'Courier New', // IE8- 字体模糊并且不支持不同字体混排，额外指定一份
      },
      dataZoom: [{
        type: 'inside',
        xAxisIndex: 0,
        start: 0,
        end: 100,
      }]
    }
    return option
  }

  render() {
    return (
      <ListView style='container'
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
        onEndReached={this._EndListPush}
        onEndReachedThreshold={30}
        enableEmptySections={true}
        removeClippedSubviews={false}
        renderHeader={() => {
          return (
            <View style={{ flex: 1, }}>
              <View style={styles.conChild}>
                <DateTable link data={this.state.baseData} />
              </View >
              <View style={{ backgroundColor: "#fff", marginBottom: 6, paddingTop: 10 }}>
                {
                  this.state.echart
                    ? <Echarts option={this._echartOption()} height={220} />
                    : <ActivityIndicator style={{ height: 220 }} />
                }
              </View>
              <ListHearder />
              <View style={{ height: 1 }} />
            </View>
          )
        }}
        renderRow={(rowData, a, index) => (
          <View >
            <View style={index % 2 ? styles.listCotOdd : styles.listCotEven}>
              <Text style={[styles.flexText, styles.tul]} onPress={() => this.props.navigation.navigate('NetBarDay', {
                time: rowData.dateMemo,
              })}>{rowData.dateMemo}</Text>
              <Text style={[styles.flexText, styles.tAr, styles.tgreen]}>{rowData.onlineSell}</Text>
              <Text style={[styles.flexText, styles.tAr, styles.tblue]}>{rowData.offlineSell}</Text>
              <Text style={[styles.flexText, styles.tAr]}>{rowData.allSell}</Text>
            </View>
            <View style={{ height: 1, backgroundColor: "#EEE" }} />
          </View>
        )}
        renderFooter={this._hanleFooter}
      />
    );
  }

  componentWillMount() {
    /* 组件初始化时只调用,整个生命周期只调用一次 */
  }
  componentDidMount() {
    // console.time('firstRequest')

    http.loadingPost('/netbar/report/overView', {}).then(res => {
      this.setState({
        baseData: res.data,
      })
    })

    http.post('/netbar/report/sellList', {
      timeLevel: 'WEEK',
      pageNumber: 1,
      pageSize: 7,
    }).then(res => {
      // console.log('week', res)
      if (res && res.status == 200) {
        let online = []
        let offline = []
        let xAxis = []
        for(var x in res.data.entitys){
          let t = res.data.entitys[x]
          online.push(t.onlineSell)
          offline.push(t.offlineSell)
          xAxis.push(t.dateMemo)
        }
        this.setState({
          echart: true,
          echartDate: {online,offline,xAxis}
        })
      }

    })

    http.post('/netbar/report/sellList', {
      timeLevel: 'DAY',
      pageNumber: 1,
      pageSize: this.listPageSize,
    }).then(res => {
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = res.data.entitys;
        this.setState({
          listStatus: listStatus,
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
        })
      }
    })

    /* 组件渲染之后调用，只调用一次。 */
  }
  componentWillReceiveProps(nextProps) {
    /* 组件初始化时不调用，组件接受新的props时调用 */
  }
  componentDidUpdate() {
    // console.log(this.state.echartDate)
    /* 组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。 */
  }
  componentWillUnmount() {
    /* 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。 */
  }

}

export default connect(
  store => ({
    store: store.userStore
  }),
  dispatch => bindActionCreators(userActions, dispatch)
)(Main);
// 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  conChild: {
    backgroundColor: "#fff",
    marginBottom: 6,
    marginTop: 6
  },
  icon: {
    marginLeft: 5,
  },
  listCotOdd: {
    flexDirection: "row",
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#f4f5f4"
  },
  listCotEven: {
    flexDirection: "row",
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#ffffff"
  },
  flexText: {
    flex: 1,
    fontSize: 14,
    height: 30,
    lineHeight: 30,
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
});