
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, ActivityIndicator, RefreshControl, FlatList, Dimensions, Image, TouchableHighlight, DeviceEventEmitter, Linking, SectionList } from 'react-native';
import { Tabs, Toast, Modal } from 'antd-mobile-rn'
import Tab from '../common/tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
// const Dheight = Dimensions.get('window').height
@insertStyle('HandleReport')
class ViewAudit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleCount: 0,
      refreshing: false,
      baseData: {},
      listStatus: "loading",
      image2h: 300,
      image1h: 300,

    };
  }
  _iconPhone = (phone) => {
    if (!phone) return
    let strPhone = "tel:" + phone;
    Linking.openURL(strPhone);

  }
  //rende之后调用
  _onRefresh = () => {
    this.setState({
      refreshing: true,
    })
    http.post('/netbar/report/sellDetailList', {
      status: 20,
      pageNumber: 1,
      pageSize: 1,
    }).then(res => {
      if (res && res.status == 200) {
        let listStatus = res.data.totalPage == 0 ? "noMore" : "goOn";
        this._dataSource = res.data.entitys[0];
        this.setState({
          handleCount: res.data.totalCount || 0,
          refreshing: false,
          listStatus: listStatus,
          baseData: res.data.entitys[0]
        })
        let screenWidth = Dimensions.get('window').width;
        // console.log(this._dataSource)
        if (this._dataSource) {
          if (this._dataSource.chargeImg) {
            Image.getSize(this._dataSource.chargeImg, (width, height) => {
              let r = screenWidth / (width / height)
              this.setState({ image2h: r || 300 })
            })
          }
          if (this._dataSource.sellImg) {
            Image.getSize(this._dataSource.sellImg, (width, height) => {
              let r = screenWidth / (width / height)
              this.setState({ image1h: r || 300 })
            })
          }
        }
      }
    })
  }
  _prompt = (val) => {
    if (val) return
    const _this = this
    Modal.prompt('提示', "请输入不通过理由", [{
      text: '取消',
      onPress: value => new Promise((resolve) => {
        resolve();
      }),
    }, {
      text: '确定',
      onPress: value => new Promise((resolve, reject) => {
        if (value) {
          resolve();
          let obj = {
            desc: value || '',
            rDate: this.state.baseData.dateMemo,
            result: false,
            sn: this.state.baseData.sn,
          }
          http.post('/netbar/report/confirm', obj).then(res => {
            if (res && res.status == 200) {
              Toast.info('操作已成功！', 1);
              this._onRefresh()
              DeviceEventEmitter.emit('refreshHomeManager', 'refresh')
            } else {
              Toast.info(res.msg, 1);
            }
          })
          // _this._hanlePassRes(false, value)
        }else{
          Toast.info('理由不能为空', 1);
          reject()
        }
      }),
    },], 'default', null, ['请输入不通过理由'])
  }

  
  _hanlePassRes = (result, desc) => {
    if (!this.state.baseData.sn) return
    Modal.alert('提示', '是否审核通过?', [
      { text: '取消', onPress: () => { }, style: 'default' },
      {
        text: '确定', onPress: () => {
          let obj = {
            desc: desc || '',
            rDate: this.state.baseData.dateMemo,
            result: result,
            sn: this.state.baseData.sn,
          }
          http.post('/netbar/report/confirm', obj).then(res => {
            if (res && res.status == 200) {
              Toast.info('操作已成功！', 1);
              this._onRefresh()
              DeviceEventEmitter.emit('refreshHomeManager', 'refresh')
            } else {
              Toast.info(res.msg, 1);
            }
          })
        }
      },
    ]);

  }

  render() {
    return (
      <View style='tab_list'>
        <ScrollView style='tab_list'
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            tintColor="#666666"
            title="Loading..."
            titleColor="#666666"
            colors={['#666666']}
            progressBackgroundColor="#f2f3f5"
          />}
        >
          {
            this.state.handleCount == 0
              ? <View>
                {
                  this.state.listStatus == 'noMore'
                    ? <Text style={{ lineHeight: 35, fontSize: 14, color: "#666666", textAlign: "center" }}>暂无待审核数据</Text>
                    : null
                }
              </View>
              : <View>
                <View style={["h30JC", "warning"]}>
                  <Text style="title_warn">{`剩余` + this.state.handleCount + `条待处理...`}</Text>
                </View>

                <Image style={{ height: this.state.image1h }}
                  source={{ uri: this.state.baseData.sellImg }} />
                <View style='border15h' />
                <View style="cont_bor">
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>起止时间：</Text>
                    <Text style={["flex1", "f16h30", "fblock3",]}>{this.state.baseData.dateMemo}</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>门店编号：</Text>
                    <Text style={["flex1", "f16h30", "fblock3",]}>{this.state.baseData.sn}[{this.state.baseData.shop}]</Text>
                  </View>
                </View>
                <View style='border10h' />
                <View style="cont_bor">
                  <View style={["flex1", "flexrow"]}>
                    <View style={["flex1", "flexcol"]}>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>总销售：</Text>
                        <Text style={["flex1", "f16h30", "fblock3", "tAlignR", "padR10"]}>{this.state.baseData.allSell}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>线上销售：</Text>
                        <Text style={["flex1", "f16h30", "fblock3", "tAlignR", "padR10"]}>{this.state.baseData.onlineSell}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>线上兑奖：</Text>
                        <Text style={["flex1", "f16h30", "fblock3", "tAlignR", "padR10"]}>{this.state.baseData.onlineBonus}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>取消：</Text>
                        <Text style={["flex1", "f16h30", "fblock3", "tAlignR", "padR10"]}>{this.state.baseData.cancel}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>应缴款：</Text>
                        <Text style={["flex1", "f16h30", "fblock3", "tAlignR", "padR10"]}>{this.state.baseData.payment}</Text>
                      </View>
                    </View>
                    <View style={["flex1", "flexcol"]}>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>总兑奖：</Text>
                        <Text style={["flex1", "f16h30", "fblock3", "tAlignR", "padR5"]}>{this.state.baseData.allBonus}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>线下销售：</Text>
                        <Text style={["flex1", "f16h30", "fblock3", "tAlignR", "padR5"]}>{this.state.baseData.offlineSell}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>线下兑奖：</Text>
                        <Text style={["flex1", "f16h30", "fblock3", "tAlignR", "padR5"]}>{this.state.baseData.offlineBonus}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>实退：</Text>
                        <Text style={["flex1", "f16h30", "fblock3", "tAlignR", "padR5"]}>{this.state.baseData.refund}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}></Text>
                        <Text style={["flex1", "f16h30", "fblock3", "tAlignR",]}></Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Image style={{ height: this.state.image2h }}
                  source={{ uri: this.state.baseData.chargeImg }} />
                <View style='border15h' />
                <View style="cont_bor">
                  <View style={["flex1", "flexrow"]}>
                    <Text style={["text_left", "f16h30", "fblock9"]}>起止时间：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.dateMemo}</Text>
                  </View>
                  <View style={["flex1", "flexrow"]}>
                    <Text style={["text_left", "f16h30", "fblock9"]}>门店编号：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.sn}[{this.state.baseData.shop}]</Text>
                  </View>
                </View>
                <View style='border10h' />
                <View style="cont_bor">
                  <View style={["flex1", "flexrow"]}>
                    <Text style={["text_left2", "f16h30", "fblock9"]}>银行卡充值：</Text>
                    <Text style={["f16h30", "fblock3", "tAlignR", "w120"]}>{this.state.baseData.bankCharge}</Text>
                  </View>
                  <View style={["flex1", "flexrow"]}>
                    <Text style={["text_left2", "f16h30", "fblock9"]}>支付宝充值：</Text>
                    <Text style={["f16h30", "fblock3", "tAlignR", "w120"]}>{this.state.baseData.aliCharge}</Text>
                  </View>
                  <View style={["flex1", "flexrow"]}>
                    <Text style={["text_left2", "f16h30", "fblock9"]}>微信充值：</Text>
                    <Text style={["f16h30", "fblock3", "tAlignR", "w120"]}>{this.state.baseData.wxCharge}</Text>
                  </View>
                </View>
              </View>
          }
        </ScrollView>
        {

          this.state.listStatus == 'goOn'
            ? <View style="bottom_btn">
              <View style="btnView">
                <TouchableHighlight onPress={() => this._iconPhone(this.state.baseData.applyMan)} underlayColor="rgba(256,256,256,0.3)" style="btns_f">
                  <Text style="btns" >联系上传人</Text>
                </TouchableHighlight>
                <View style='border10_b'></View>
                <TouchableHighlight onPress={() => this._prompt(false)} underlayColor="rgba(256,256,256,0.3)" style="btns_f">
                  <Text style="btns" >审核不通过</Text>
                </TouchableHighlight>
                <View style='border10_b'></View>
                <TouchableHighlight onPress={() => this._hanlePassRes(true)} underlayColor="rgba(256,256,256,0.3)" style="btns_f">
                  <Text style="btns" >审核通过</Text>
                </TouchableHighlight>
              </View>
            </View>
            : null
        }


      </View>
    )
  }
  componentDidMount() {
    this._onRefresh()
  }
}

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
          shopPhone:d.shopPhone,
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
            shopPhone:d.shopPhone,
            data: [{
              dateMemo: d.dateMemo,
              sn: d.sn
            }]
          })
        }
      }
    }
    console.log(_Ary)
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
      status: 10,
      pageNumber: 1,
      pageSize: this.listPageSize,
    }).then(res => {
      console.log(res)
      // console.log(`promise _onRefresh 当前时间：` + (new Date().getTime() - 1544400000000))
      if (res && res.status == 200) {
        var listStatus = res.data.totalPage == 1 ? "noMore" : "goOn";
        this._dataSource = this._hanleDate(res.data.entitys)
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
      status: 10,
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
          <View style={style.t_text}><Text style={{ fontSize: 16 ,color:"#333"}}>{section.shop}</Text></View>
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
          <Text style={["up_text", "up_list", "fblock3"]}>{this.props.data.dateMemo}</Text>
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