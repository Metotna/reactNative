
import React, { Component } from 'react';
import { StyleSheet, Text, View, RefreshControl, ListView, ActivityIndicator, DeviceEventEmitter, FlatList, Dimensions, Modal, TouchableHighlight, Image, Platform } from 'react-native';
import Echarts from '../../util/echart';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from '../../util/redux/action/user';
import { getXWeekDate, getweek } from '../../util/install'
import ListHearder from '../tabbarHome/component/homeStoreListHearder'
import DateTable from '../tabbarHome/component/dateTable'
import { onlineOffShow, echartShowDetail } from "../../config"

const DWidth = Dimensions.get('window').width

@insertStyle('TabbarHomeStyle')
class Main extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      refreshing: false,
      baseData: {},
      echart: false,
      echartData: {
        online: [],
        offline: [],
        xAxis: [],
        alls: [],
        total: [],
      },
      xAxis: [],
      listStatus: 'Loading',
      listReqing: false,
      listPage: 1,
      dataSource: ds,
      modalVisible: false,
    };
    this._dataSource = [];
    this.listPageSize = 20;
  }

  _onPressButton = () => {
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
        const eData = this._echartData(offline, online, xAxis)
        this.setState({
          echartData: { online: eData.online, offline: eData.offline, xAxis: eData.xAxis, alls: eData.alls, total: eData.total }
        })
        setTimeout(() => { this.setState({ echart: true }) })
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

  _onEndReached = () => {
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

  _echartData = (offline, online, xAxis) => {
    let _offline = [];
    let _online = [];
    let _xAxis = [];
    let _alls = []
    let _total = [];
    for (var i = 0; i < 7; i++) {
      _offline[i] = offline[i] ? offline[i] : 0;
      _online[i] = online[i] ? online[i] : 0;
      // _alls[i]=_offline[i] + _online[i]
      let _a = (_offline[i] + _online[i]) * 1
      _total[i] = _a;
      _alls[i] = _a > 100000 ? ((_a / 10000).toFixed(1) + "w") : _a;

      if (xAxis[i]) {
        let r = xAxis[i].split('-')
        let res = getXWeekDate(r[0], r[1], 'MM.dd')
        _xAxis.push(res[0] + '-' + res[1])
      } else {
        if (i == 0) {
          let r = getweek()
          xAxis[0] = r[0] + '-' + r[1];
          let res = getXWeekDate(r[0], r[1], 'MM.dd')
          _xAxis[0] = res[0] + '-' + res[1];
        } else {
          let xr = xAxis[i - 1].split('-');
          if (xr[1] * 1 == 1) {
            let r = getweek(`${xr[0] - 1}-12-31`)
            xAxis[i] = r[0] + '-' + r[1];
            let res = getXWeekDate(r[0], r[1], 'MM.dd')
            _xAxis[i] = res[0] + '-' + res[1];
          } else {
            xAxis[i] = xr[0] + '-' + (xr[1] - 1);
            let res = getXWeekDate(xr[0], xr[1] - 1, 'MM.dd')
            _xAxis[i] = res[0] + '-' + res[1];
          }
        }
      }

    }
    _offline.reverse()
    _online.reverse()
    _xAxis.reverse()
    _alls.reverse()
    _total.reverse()
    return {
      offline: _offline,
      online: _online,
      xAxis: _xAxis,
      alls: _alls,
      total: _total,
    }
  }

  _echartOption = () => {
    // console.log(`echarts`)
    var _offline = this.state.echartData.offline;
    var _online = this.state.echartData.online;
    var _xAxis = this.state.echartData.xAxis;
    var _all = this.state.echartData.alls;
    var _total = this.state.echartData.total;
    var option_1 = {
      title: {
        text: '销售周趋势图',
        textStyle: {
          fontSize: 16,
          fontWeight: 300,
        },
        // top: '5%',
        left: '3%',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '线下: {c1}<br />线上: {c0}'
      },
      color: ['rgba(17,79,205,.7)', 'rgba(61,175,177,.7)',],
      legend: {
        textStyle: {
          fontSize: 12,
          lineHeight: 25,
        },
        data: ['线上', "线下"],
        selectedMode: false,
        // top: '5%',
        itemHeight: 7,
        right: '5%',
        // align:'right'
      },
      grid: {
        // show:true,
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '18%',
        // borderWidth:10,
      },
      xAxis: {
        show: false,
        type: 'category',
        boundaryGap: true,
        data: _all,
        axisLabel: {
          fontSize: 14,
          // formatter:function(params){
          //   reutrn `1`
          // }
          // interval: 0,
          // formatter: function (value, index) {
          //   let r = value.split('-')
          //   // console.log(`${r[0]}
          //   //  ${r[1]}`)
          //   // return r[0]+"\r\n"+r[1]
          //   return `${r[0]}-${r[1]}`
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
          name: '线上',
          type: 'bar',
          stack: '总量',
          data: _online,
          barCategoryGap: 20,
          itemStyle: {
            normal: {
              color: 'rgba(61,175,177,.7)',
              label: {
                show: false,
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
        {
          name: '线下',
          type: 'bar',
          stack: '总量',
          data: _offline,
          itemStyle: {
            normal: {
              color: 'rgba(17,79,205,.7)',
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: 12,
                  color: "#333",
                },
                formatter: (params) => {
                  // console.log(params)
                  let i = params.dataIndex
                  return params.name
                },
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
    var option_2 = {
      title: {
        text: '销售周趋势图',
        textStyle: {
          fontSize: 16,
          fontWeight: 300,
        },
        // top: '5%',
        left: '3%',
      },
      grid: {
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '18%',
      },
      xAxis: {
        show: false,
        type: 'category',
        boundaryGap: true,
        data: _all,
        axisLabel: {
          fontSize: 14,
        }
      },
      yAxis: {
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
      series: [
        {
          name: '总销售',
          type: 'bar',
          data: _total,
          barCategoryGap: 20,
          itemStyle: {
            normal: {
              color: 'rgba(61,175,177,.9)',
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: 10,
                  color: "#333"
                },
                formatter: (params) => {
                  let i = params.dataIndex
                  return params.name
                },
              }
            }
          },
        },
      ],
    }
    return echartShowDetail ? option_1 : option_2;
  }

  _hanleModal = () => {
    this.setState({ modalVisible: false })
  }

  render() {
    const tForamt = (val, index) => {
      if (val) {
        return val.split("-")[index]
      }
      return val
    }
    return (
      <View style="flex1">
        <ListView style='container'
          // onScroll={this._listViewScroll}
          // scrollEventThrottle={200}
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
          renderHeader={() => {
            return (
              <View style={{ flex: 1, }}>
                <View style={styles.conChild}>
                  <DateTable link data={this.state.baseData} />
                </View >
                <View style={{ backgroundColor: "#fff", marginBottom: 6, paddingTop: 10 }}>
                  {
                    this.state.echart
                      ? <View style={{ height: 220 }}>
                        <View style={styles.echartxAias}>
                          <FlatList
                            style={{ flex: 1, flexDirection: "row", }}
                            data={this.state.echartData.xAxis}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => <View style={styles.echild}>
                              <Text style={styles.echildText}>{tForamt(item, 0)}</Text>
                              <Text style={styles.echildText}>{tForamt(item, 1)}</Text>
                            </View>}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                          />
                        </View>
                        <Echarts option={this._echartOption()} height={220} />
                      </View>

                      : <ActivityIndicator style={{ height: 220 }} />
                  }
                </View>
                <View style={{ height: 1 }} />
              </View>
            )
          }}
          renderRow={(rowData, a, index) => (<ListHearder list data={rowData} index={index} />)}
          renderSectionHeader={(sectionData, sectionID) => <ListHearder />}
          stickySectionHeadersEnabled={true}
          renderFooter={this._renderFooter}
        />
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this._hanleModal}
        >
          <View style={{ paddingTop: 138, paddingLeft: 26, paddingRight: 26, flex: 1, backgroundColor: "rgba(0,0,0,0.50)", alignItems: 'center', }}>
            <Image style={{ height: 263, width: 323 }} source={require('../../assets/image/my/lead.png')} />
            <TouchableHighlight onPress={() => { this.setState({ modalVisible: false }) }}>
              <Image style={{ height: 30, width: 150, marginTop: 35 }} source={require('../../assets/image/my/button.png')} />
            </TouchableHighlight>
            {/* <TouchableHighlight onPress={() => { this.setState({ modalVisible: false }) }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight> */}
          </View>
        </Modal>
      </View>
    );
  }

  componentWillMount() {
    /* 组件初始化时只调用,整个生命周期只调用一次 */
    http.post("/netbar/my/shopInfo", {}).then(res => {
      if (res && res.status == 200) {
        this.props.navigation.setParams({ title: res.data.shopName })
      }
    })

    this.Emitter = DeviceEventEmitter.addListener('refreshHomeStore', (data) => {

      if (data == 'refresh') {
        this._onRefresh();
      }
    });
  }
  componentDidMount() {
    Storage.get('leadShow').then(res => {
      if (!res) this.setState({ modalVisible: true })
    })
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
        const eData = this._echartData(offline, online, xAxis)
        this.setState({
          echartData: { online: eData.online, offline: eData.offline, xAxis: eData.xAxis, alls: eData.alls, total: eData.total }
        })
        setTimeout(() => { this.setState({ echart: true }) })
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

    Storage.save("leadShow", "true");
    /* 组件渲染之后调用，只调用一次。 */
  }
  componentWillReceiveProps(nextProps) {
    /* 组件初始化时不调用，组件接受新的props时调用 */
  }
  componentDidUpdate() {
    // console.log(this.state.echartData)
    /* 组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。 */
  }
  componentWillUnmount() {
    this.Emitter.remove();
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
  echartxAias: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 35,
    paddingLeft: DWidth * 0.06,
    paddingRight: DWidth * 0.05,
    backgroundColor: "#fff",
    zIndex: 5,
  },
  echild: {
    width: DWidth * .9 / 7.1,
    height: 35,
    justifyContent: 'center',
  },
  echildText: {
    fontSize: 12,
    textAlign: "center",
    color: "#333"
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