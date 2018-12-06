
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, ActivityIndicator, RefreshControl, FlatList, Dimensions, Image ,TouchableHighlight} from 'react-native';
import { Tabs, Toast, Modal } from 'antd-mobile-rn'
import Icon from 'react-native-vector-icons/FontAwesome'
const Dheight = Dimensions.get('window').height
const prompt = Modal.prompt;
@insertStyle('HandleReport')
class ViewAudit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleCount: 0,
      refreshing: false,
      baseData: {},
      listStatus: "loading",
    };
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
      }
    })
  }
  _prompt = (val) => {
    if (val) return
    const _this = this
    prompt('警告', '请输入不通过理由', [{
      text: '取消',
      onPress: value => new Promise((resolve) => {
        resolve();
      }),
    },{
      text: '确定',
      onPress: value => new Promise((resolve, reject) => {
        if (value) {
          reject();
          _this._hanlePassRes(false, value)
        }
      }),
    },], 'default', null, ['原因不能为空'])
  }

  _hanlePassRes = (result, desc) => {
    if (!this.state.baseData.sn) return
    // Toast.success('Load success !!!', 1);
    let obj = {
      desc: desc || '',
      rDate: this.state.baseData.dateMemo,
      result: result,
      sn: this.state.baseData.sn,
    }
    http.post('/netbar/report/confirm', obj).then(res => {
      if (res && res.status == 200) {
        Toast.success('Load success !!!', 1);
        this._onRefresh()
      } else {
        Toast.success(res.msg, 1);
      }
    })
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
                <View style={["h30JC","warning"]}>
                <Text style="title_warn">{`剩余` + this.state.handleCount + `条待处理...`}</Text>
                </View>
               
                <Image style="content_imga"
                  source={{ uri: this.state.baseData.chargeImg }} />
                <View style='border15h' />
                <View style="cont_bor">
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>起止时间：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.dateMemo}</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>门店编号：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.onlineSell}</Text>
                  </View>
                </View>
                <View style='border10h' />
                <View style="cont_bor">
                  <View style={["flex1", "flexrow"]}>
                    <View style={["flex1", "flexcol"]}>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>总销售：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.allSell}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>线上销售：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.onlineSell}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>线上兑奖：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.onlineBonus}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>取消：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.cancel}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>应缴款：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.payment}</Text>
                      </View>
                    </View>
                    <View style={["flex1", "flexcol"]}>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>总兑奖：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.allBonus}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>线下销售：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.offlineSell}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>线下兑奖：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.offlineBonus}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>实退：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.refund}</Text>
                      </View>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}></Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}></Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Image style="content_imga"
                  source={{ uri: this.state.baseData.sellImg }} />
                <View style='border15h' />
                <View style="cont_bor">
                  <View style={["flex1", "flexrow"]}>
                    <Text style={["text_left", "f16h30", "fblock9"]}>起止时间：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.dateMemo}</Text>
                  </View>
                  <View style={["flex1", "flexrow"]}>
                    <Text style={["text_left", "f16h30", "fblock9"]}>门店编号：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.onlineSell}</Text>
                  </View>
                </View>
                <View style='border10h' />
                <View style="cont_bor">
                  <View style={["flex1", "flexrow"]}>
                    <Text style={["text_left2", "f16h30", "fblock9"]}>银行卡充值：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.bankCharge}</Text>
                  </View>
                  <View style={["flex1", "flexrow"]}>
                    <Text style={["text_left2", "f16h30", "fblock9"]}>支付宝充值：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.aliCharge}</Text>
                  </View>
                  <View style={["flex1", "flexrow"]}>
                    <Text style={["text_left2", "f16h30", "fblock9"]}>微信充值：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.wxCharge}</Text>
                  </View>
                </View>
              </View>
          }
        </ScrollView>
            {

              this.state.listStatus =='goOn'
              ?        <View style="bottom_btn">
              <View style="btnView">
              <TouchableHighlight onPress={() => this._prompt(true)}  underlayColor="rgba(256,256,256,0.3)" style="btns_f">
                <Text style="btns" >联系上传人</Text>
                </TouchableHighlight>
                <View style='border10_b'></View>
                <TouchableHighlight onPress={() => this._prompt(false)}  underlayColor="rgba(256,256,256,0.3)" style="btns_f">
                <Text style="btns" >审核不通过</Text>
                </TouchableHighlight>
                <View style='border10_b'></View>
                <TouchableHighlight onPress={() => this._hanlePassRes(true)}  underlayColor="rgba(256,256,256,0.3)" style="btns_f">
                <Text style="btns" >审核通过</Text>
                </TouchableHighlight>
              </View>
            </View>
            :null
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
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this._dataSource = [{ child: [1, 2, 34] }]
    this.state = {
      dataSource: ds.cloneWithRows(this._dataSource),
      refreshing: false,
      listPage: 1,
      listStatus: 'Loading',
      listReqing: false,
    };
    this.listPageSize = 20
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
          shopId: d.shopId,
          shop: d.shop,
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
            shopId: d.shopId,
            shop: d.shop,
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
    this.setState({
      refreshing: true,
      listPage: 1,
    })
    http.post('/netbar/report/sellDetailList', {
      status: 10,
      pageNumber: 1,
      pageSize: this.listPageSize,
    }).then(res => {
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = this._hanleDate(res.data.entitys)
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
    // if (!this._dataSource.length) return
    this.setState({ listReqing: true })
    http.post('/netbar/report/sellDetailList', {
      status: 10,
      pageNumber: this.state.listPage + 1,
      pageSize: this.listPageSize,
    }).then(res => {
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = this._hanleDate(res.data.entitys, this._dataSource)
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

  render() {
    return (
      <ListView style="tab_list"
        ref={(ref) => this.myComponent = ref}
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
        onEndReached={this._onEndReached}
        renderFooter={this._renderFooter}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderRow={(rowData) => (
          <View>
            <ViewUploadTitle name={rowData.shop} />
            <FlatList
              data={rowData.data}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => <ViewUploadList data={item} />}
            />
          </View>
        )} />
    )
  }
}

@insertStyle('HandleReport')
class ViewUploadTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleCount: 0,
    };
  }
  render() {
    return (
      <View>
        {
          this.props.name
            ? <View style="up_title">
              <Text style="up_text">{this.props.name}</Text>
              <Icon name="phone" size={17} color="#333" />
            </View>
            : <View />
        }
      </View>
    )
  }
}

@insertStyle('HandleReport')
class ViewUploadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleCount: 0,
    };
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
        <View style={{ height: 42 }}>
          <Tabs tabs={tabs} initialPage={0} tabBarUnderlineStyle={{ backgroundColor: "#E7505A" }} tabBarActiveTextColor="#E7505A" onChange={this._tabChange} tabBarInactiveTextColor="#666666"></Tabs>
        </View>
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