
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
      return <View style={{height:35,justifyContent:"center"}}>
     <Text style={{  textAlign: "center", color: "#666" }}>加载中...</Text>
      </View>
    } else if (this.state.listStatus == "noMore") {
      return <View style={{height:35,justifyContent:"center"}}>
      <Text style={{  textAlign: "center", color: "#666" }}>暂无更多数据</Text>
       </View>
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
      if (res && res.status == 200) {
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
        for (var x in res.data.entitys) {
          let t = res.data.entitys[x]
          online.push(t.onlineSell)
          offline.push(t.offlineSell)
          xAxis.push(t.dateMemo)
        }
        this.setState({
          echart: true,
          echartDate: { online, offline, xAxis }
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
    let t = []
    for(var i=0;i<this.state.echartDate.xAxis.length;i++){
      let r =this.state.echartDate.xAxis[i].split('-')
      const res = getXWeekDate(r[0],r[1],'MM.dd')
      t.push(res[0]+'-'+res[1])
    }
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
        data: t,
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
        for (var x in res.data.entitys) {
          let t = res.data.entitys[x]
          online.push(t.onlineSell)
          offline.push(t.offlineSell)
          xAxis.push(t.dateMemo)
        }
        this.setState({
          echart: true,
          echartDate: { online, offline, xAxis }
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
const getXWeekDate = (year, weeks, format) => {
  var format = format || 'yyyy/MM/dd'
  var date = new Date(year, "0", "1");
  var time = date.getTime();
  // 获取当前星期几，0：星期一 。。。。        

  var _week = date.getDay();
  //当这一年的1月1日为周日时则本年有54周，否则没有54周，没有则去除第54周的提示        
  if (_week != 0) { //一年53周情况                    
    if (weeks == 54) {
      return '今年没有54周';
    }
    var cnt = 0; // 获取距离周末的天数                  
    if (_week == 0) {
      cnt = 7;
    }
    else if (_week == 1) {
      cnt = 6;
    }
    else if (_week == 2) {
      cnt = 5;
    }
    else if (_week == 3) {
      cnt = 4;
    }
    else if (_week == 4) {
      cnt = 3;
    }
    else if (_week == 5) {
      cnt = 2;
    }
    else if (_week == 6) {
      cnt = 1;
    }
    cnt += 1; //加1表示以星期一为一周的第一天                   
    // 将这个长整形时间加上第N周的时间偏移                   
    time += cnt * 24 * 3600000; //第2周开始时间                 
    var nextYear = new Date(parseInt(year, 10) + 1, "0", "1");
    var nextWeek = nextYear.getDay();
    var lastcnt = 0; //获取最后一周开始时间到周末的天数                   
    if (nextWeek == 0) {
      lastcnt = 6;
    }
    else if (nextWeek == 1) {
      lastcnt = 0;
    }
    else if (nextWeek == 2) {
      lastcnt = 1;
    }
    else if (nextWeek == 3) {
      lastcnt = 2;
    }
    else if (nextWeek == 4) {
      lastcnt = 3;
    }
    else if (nextWeek == 5) {
      lastcnt = 4;
    }
    else if (nextWeek == 6) {
      lastcnt = 5;
    }
    if (weeks == 1) { //第1周特殊处理                       
      // 为日期对象 date 重新设置成时间 time                      
      var start = date.format(format);
      date.setTime(time - 24 * 3600000);
      return [start, date.format(format)]
    }
    else if (weeks == 53) { //第53周特殊处理                        
      var start = time + (weeks - 2) * 7 * 24 * 3600000; //第53周开始时间                      
      var end = time + (weeks - 2) * 7 * 24 * 3600000 + lastcnt * 24 * 3600000 - 24 * 3600000; //第53周结束时间                       
      // 为日期对象 date 重新设置成时间 time                    
      date.setTime(start);
      var _start = date.format(format);
      date.setTime(end);
      var _end = date.format(format);
      return [_start, _end]
    } else {
      var start = time + (weeks - 2) * 7 * 24 * 3600000; //第n周开始时间                       
      var end = time + (weeks - 1) * 7 * 24 * 3600000 - 24 * 3600000; //第n周结束时间                       
      // 为日期对象 date 重新设置成时间 time                      
      date.setTime(start);
      var _start = date.format(format);
      date.setTime(end);
      var _end = date.format(format);
      return [_start, _end]
    }
  } else { //一年54周情况                    
    var cnt = 0; // 获取距离周末的天数                    
    if (_week == 0 && weeks == 1) { //第一周                 
      cnt = 0;
    }
    else if (_week == 0) {
      cnt = 7;
    }
    else if (_week == 1) {
      cnt = 6;
    }
    else if (_week == 2) {
      cnt = 5;
    }
    else if (_week == 3) {
      cnt = 4;
    }
    else if (_week == 4) {
      cnt = 3;
    }
    else if (_week == 5) {
      cnt = 2;
    }
    else if (_week == 6) {
      cnt = 1;
    }
    cnt += 1; //加1表示以星期一为一周的第一天                   
    // 将这个长整形时间加上第N周的时间偏移                 
    time += 24 * 3600000; //第2周开始时间                   
    var nextYear = new Date(parseInt(year, 10) + 1, "0", "1");
    var nextWeek = nextYear.getDay();
    var lastcnt = 0; //获取最后一周开始时间到周末的天数                    
    if (nextWeek == 0) {
      lastcnt = 6;
    }
    else if (nextWeek == 1) {
      lastcnt = 0;
    }
    else if (nextWeek == 2) {
      lastcnt = 1;
    }
    else if (nextWeek == 3) {
      lastcnt = 2;
    }
    else if (nextWeek == 4) {
      lastcnt = 3;
    }
    else if (nextWeek == 5) {
      lastcnt = 4;
    }
    else if (nextWeek == 6) {
      lastcnt = 5;
    }
    if (weeks == 1) { //第1周特殊处理                       
      // 为日期对象 date 重新设置成时间 time                        
      var start = date.format(format);
      date.setTime(time - 24 * 3600000);
      return [start, date.format(format)]
    }
    else if (weeks == 54) { //第54周特殊处理                        var start = time+(weeks-2)*7*24*3600000; //第54周开始时间                        var end = time+(weeks-2)*7*24*3600000+ lastcnt*24*3600000- 24*3600000; //第53周结束时间                       
      // 为日期对象 date 重新设置成时间 time                     
      date.setTime(start);
      var _start = date.format(format);
      date.setTime(end);
      var _end = date.format(format);
      return [_start, _end]
    } else {
      var start = time + (weeks - 2) * 7 * 24 * 3600000; //第n周开始时间                       
      var end = time + (weeks - 1) * 7 * 24 * 3600000 - 24 * 3600000; //第n周结束时间                       
      // 为日期对象 date 重新设置成时间 time                      
      date.setTime(start);
      var _start = date.format(format);
      date.setTime(end);
      var _end = date.format(format);
      return [_start, _end]
    }
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
    paddingTop: 7,
    paddingBottom: 7,

    backgroundColor: "#f4f5f4"
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
});