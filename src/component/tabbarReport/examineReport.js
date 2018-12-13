
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ListView, Alert, ScrollView, Dimensions } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from '../../util/redux/action/user';

@insertStyle('HandleReport')
class Main extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.dateSource = navigation.getParam('source')
    this.state = {
      baseData: {},
      image1h: 300,
      image2h: 300,
      status: this.dateSource.status,
    }
    // this.handleClick= this.handleClick.bind(this)

    // console.log(this.dateSource)
  }


  //rende之后调用
  componentDidMount() {
    // this.dopost();
    this._acquireData()
  }
  _acquireData = () => {
    let obj = {
      sn: this.dateSource.sn,
      status: this.dateSource.status,
      sDate: this.dateSource.dateMemo,
      eDate: this.dateSource.dateMemo,
      shopId: this.dateSource.shopId,
    }
    // console.log(obj)
    http.loadingPost('/netbar/report/sellDetailList', obj).then(res => {
      // console.log(res)
      if (res && res.status == 200) {
        this.setState({
          baseData: res.data.entitys[0],
        })

        let screenWidth = Dimensions.get('window').width;
        Image.getSize(res.data.entitys[0].chargeImg, (width, height) => {
          let r = screenWidth / (width / height)
          this.setState({ image2h: r })
          //width 图片的宽度
          //height 图片的高度
        })
        Image.getSize(res.data.entitys[0].sellImg, (width, height) => {
          let r = screenWidth / (width / height)
          this.setState({ image1h: r })

          //width 图片的宽度
          //height 图片的高度
        })
      }

    })
  }

  _btnOnPress = () => {
    this.props.navigation.navigate('uploadreport', {
      pdata: this.dateSource,
      path: 't'
    });
  }

  render() {
    return (
      <View style='container'>
        <View style='tab_list'>
          <ScrollView style='tab_list'>
            <Image source={{ uri: this.state.baseData.sellImg }} style={{ height: this.state.image1h }} />
            <View style='border15h' />
            <View style="cont_bor">
              <View style="flexrow">
                <Text style={["text_left", "f16h30", "fblock9"]}>起止时间：</Text>
                <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.dateMemo}</Text>
              </View>
              <View style="flexrow">
                <Text style={["text_left", "f16h30", "fblock9"]}>门店编号：</Text>
                <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.sn}</Text>
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
            <Image source={{ uri: this.state.baseData.chargeImg }} style={{ height: this.state.image2h }} />
            <View style='border15h' />
            <View style="cont_bor">
              <View style={["flex1", "flexrow"]}>
                <Text style={["text_left", "f16h30", "fblock9"]}>起止时间：</Text>
                <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.dateMemo}</Text>
              </View>
              <View style={["flex1", "flexrow"]}>
                <Text style={["text_left", "f16h30", "fblock9"]}>门店编号：</Text>
                <Text style={["flex1", "f16h30", "fblock3"]}>{this.state.baseData.sn}</Text>
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
          </ScrollView>

          {
            this.state.status == 20 || this.state.status ==15
              ? <View style="bottom_btn2">
                <Text style="bb2_text" onPress={this._btnOnPress}>重新上传</Text>
              </View>
              : null
          }

        </View>

      </View>
    );
  }

  handlePress = () => {
    this.props.logIn({
      name: 'yujie',
      password: '123'
    })

    setTimeout(() => {
      console.log(this.props.store)

    }, 1000)
  }

}

export default connect(
  store => ({
    store: store.userStore
  }),
  dispatch => bindActionCreators(userActions, dispatch)
)(Main);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});