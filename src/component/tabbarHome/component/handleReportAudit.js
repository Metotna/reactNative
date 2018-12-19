import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, ActivityIndicator, RefreshControl, FlatList, Dimensions, Image, TouchableHighlight, DeviceEventEmitter, Linking, SectionList, TouchableOpacity } from 'react-native';
import { Toast, Modal, Picker, } from 'antd-mobile-rn'

class ImageCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: this.props.src || "",
      imageH: 200,
      iIndex: this.props.index || "",
      iTotal: this.props.total || "",
    };

  }
  componentDidMount() {
    let screenWidth = Dimensions.get('window').width;
    if (this.state.imageSrc) {
      Image.getSize(this.state.imageSrc, (width, height) => {
        let r = screenWidth / (width / height)
        this.setState({ imageH: r || 200 })
      })
    }
  }
  render() {
    const style = {
      pView: {
        position: "absolute",
        right: 0,
        bottom: 10,
        backgroundColor: "#fff",
        justifyContent: "center",
        height: 20,
        paddingLeft: 5,
        zIndex: 5,
        paddingRight: 5,
      },
      pText: {
        fontSize: 13,
        color: "#333",
      }
    }
    return (
      <View style={{ height: this.state.imageH, marginBottom: 5 }}>
        <View style={style.pView}><Text style={style.pText}>第 {this.state.iIndex + 1} / {this.state.iTotal} 张</Text></View>
        <Image style={{ height: this.state.imageH }} source={{ uri: this.state.imageSrc }} />
      </View>
    )
  }
}
const CustomChildren = props => (
  <TouchableOpacity onPress={props.onClick} style={{ height: 30, width: 80, backgroundColor: "#fff7de" }}>
    <View style={{ justifyContent: "center", height: 30, }}>
      <Text style={{ fontSize: 12, color: '#592a00', textAlign: "center", }}>{props.extra}</Text>
    </View>
  </TouchableOpacity>
);

@insertStyle('HandleReport')
export default class ViewAudit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleCount: 0,
      refreshing: false,
      baseData: {},
      listStatus: "loading",
      sellImgList: [],
      chargeImgList: [],
      shopId: [],
      netList: [[{
        label: "所有网吧",
        value: "all"
      }]],
    };
  }
  _iconPhone = (phone) => {
    if (!phone) return
    let strPhone = "tel:" + phone;
    Linking.openURL(strPhone);
  }
  //rende之后调用
  _onRefresh = () => {
    // console.log(`刷新数据`)

    this.setState({
      refreshing: true,
    })
    let obj = {
      status: 20,
      pageNumber: 1,
      pageSize: 1,
    }
    if (this.state.shopId.length) {
      obj.shopId = this.state.shopId[0]
    }
    http.post('/netbar/report/sellDetailList', obj).then(res => {
      if (res && res.status == 200) {
        let listStatus = res.data.totalPage == 0 ? "noMore" : "goOn";
        this._dataSource = res.data.entitys[0];
        this.setState({
          handleCount: res.data.totalCount || 0,
          listStatus: listStatus,
          baseData: res.data.entitys[0],
          chargeImgList: res.data.entitys.length > 0 ? this._dataSource.chargeImg.split(',') : [],
          sellImgList: res.data.entitys.length > 0 ? this._dataSource.sellImg.split(',') : [],
        })
        setTimeout(()=>{
        this._scrollView.scrollTo({x: 0, y: 0, animated: true}); 
        },100)
      }
        this.setState({refreshing: false,})
    })
    this._netList()
  }
  /* 审核不通过 */
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
        } else {
          Toast.info('理由不能为空', 1);
          reject()
        }
      }),
    },], 'default', null, ['请输入不通过理由'])
  }
  /* 审核通过 */
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
              this._netNextList(this.state.shopId[0])
              DeviceEventEmitter.emit('refreshHomeManager', 'refresh')
            } else {
              Toast.info(res.msg, 1);
            }
          })
        }
      },
    ]);
  }
  /* 网吧列表 */
  _netList = () => {
    // console.log(`选择框列表`)

    http.post('/netbar/report/count', {
      status: 20,
    }).then(res => {
      if (res && res.status == 200) {
        let netList = [[{
          label: "所有网吧",
          value: "all"
        }]]
        if (res.data.length > 0) {
          res.data.map(x => {
            netList[0].push({
              label: `${x.shopName} (${x.count})个`,
              value: x.shopId + "",
            })
          })
        }
        this.setState({
          netList,
        })
      }
    })
  }

  /* 下一条数据请求 */
  _netNextList = (val) => {
    // console.log(`下一条记录请求`)
    if (!val || val=="all") this._onRefresh()
    else {
      http.loadingPost('/netbar/report/sellDetailList', {
        status: 20,
        shopId: val,
        pageNumber: 1,
        pageSize: 1,
      }).then(res => {
        if (res && res.status == 200) {
        // ScrollView.scrollTo({x: 0, y: 0, animated: true})
        this._scrollView.scrollTo({x: 0, y: 0, animated: true}); 
          if (res.data.entitys.length > 0) {
            let listStatus = res.data.totalPage == 0 ? "noMore" : "goOn";
            this._dataSource = res.data.entitys[0];
            this.setState({
              handleCount: res.data.totalCount || 0,
              listStatus: listStatus,
              baseData: res.data.entitys[0],
              sellImgList: this._dataSource.sellImg.split(','),
              chargeImgList: this._dataSource.chargeImg.split(','),
            })
            this._netList()
          } else {
            this.state.shopId = [];
            this._onRefresh()
          }

        }
      })
    }
  }

  _onOk = (val) => {
    // console.log(`选择后请求` + val)
    this._netNextList(val+'')
  }
  
  render() {
    return (
      <View style='tab_list'>
        {
          this.state.handleCount > 0
            ? <View>
              <View style={["h30", "flexrow"]}>
                <View style={["h30JC", "warning", "flex1"]}>
                  <Text style="title_warn">{`剩余` + this.state.handleCount + `条待处理...`}</Text>
                </View>
                <View style={{ width: 1, backgroundColor: "#FFF7DE", paddingTop: 7, paddingBottom: 7 }}>
                  <View style={{ height: 16, backgroundColor: "#666" }} />
                </View>
                <Picker
                  data={this.state.netList}
                  title="选择网吧"
                  cols={1}
                  cascade={false}
                  extra="所有网吧"
                  value={this.state.shopId}
                  onOk={v => this._onOk(v)}
                  onChange={v => this.setState({ shopId: v })}
                >
                  <CustomChildren>Customized children</CustomChildren>
                </Picker>
              </View>
            </View> : null}
        <ScrollView style='tab_list'
        ref={(scrollView) => {  this._scrollView = scrollView; }}
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
              : <View >


                <FlatList
                  style={{ backgroundColor: "#fff" }}
                  data={this.state.sellImgList}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item, index }) => <ImageCom index={index} total={this.state.sellImgList.length} src={item} />}
                />
                {/* <Image style={{ height: this.state.image1h }}
                  source={{ uri: this.state.baseData.sellImg }} /> */}

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
                <FlatList
                  style={{ backgroundColor: "#fff" }}
                  data={this.state.chargeImgList}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item, index }) => <ImageCom index={index} total={this.state.chargeImgList.length} src={item} />}
                />
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
        </ScrollView>

      </View>
    )
  }
  componentDidMount() {
    this._onRefresh()
  }
}
