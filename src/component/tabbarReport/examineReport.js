
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ListView, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from '../../util/redux/action/user';


@insertStyle('HandleReport')
class Main extends Component {
  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: ds.cloneWithRows(['row 1', 'row 2', 'row 1', 'row 1', 'row 1', 'row 1', 'row 1']),
    };
  }

  //   <Button
  //   title="testbtn"
  //   onPress={() => this.props.navigation.navigate('Page4')}
  // />
  handleClickTab = (info) => {
    console.log(info.title)
  }

  render() {
    return (
      <View style='container'>

        <View style='tab_list'>
          <ScrollView style='tab_list'>
            <View style="content_imga" />
            <View style='border15h' />
            <View style="cont_bor">
              <View style="flexrow">
                <Text style={["text_left", "f16h30", "fblock9"]}>起止时间：</Text>
                <Text style={["flex1", "f16h30", "fblock3"]}>2018.03.26(四) 至 2018.03.26(四)</Text>
              </View>
              <View style="flexrow">
                <Text style={["text_left", "f16h30", "fblock9"]}>门店编号：</Text>
                <Text style={["flex1", "f16h30", "fblock3"]}>01-012345</Text>
              </View>
            </View>
            <View style='border10h' />
            <View style="cont_bor">
              <View style="flexrow">
                <View style="flexcol">
                  <View style={["flex1", "flexrow"]}>
                    <Text style={["text_left", "f16h30", "fblock9"]}>总销售：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>888888</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>线上销售：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>线上兑奖：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>取消：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>应缴款：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                  </View>
                </View>
                <View style="flexcol">
                  <View style={["flex1", "flexrow"]}>
                    <Text style={["text_left", "f16h30", "fblock9"]}>总兑奖：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>888888</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>线下销售：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>线下兑奖：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>实退：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}></Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}></Text>
                  </View>
                </View>
              </View>
            </View>
            <View style="content_imga" />
            <View style='border15h' />
            <View style="cont_bor">
              <View style="flexrow">
                <Text style={["text_left", "f16h30", "fblock9"]}>起止时间：</Text>
                <Text style={["flex1", "f16h30", "fblock3"]}>2018.03.26(四) 至 2018.03.26(四)</Text>
              </View>
              <View style="flexrow">
                <Text style={["text_left", "f16h30", "fblock9"]}>门店编号：</Text>
                <Text style={["flex1", "f16h30", "fblock3"]}>01-124568</Text>
              </View>
            </View>
            <View style='border10h' />
            <View style="cont_bor">
              <View style="flexrow">
                <Text style={["text_left2", "f16h30", "fblock9"]}>银行卡充值：</Text>
                <Text style={["flex1", "f16h30", "fblock3"]}>888888.88</Text>
              </View>
              <View style="flexrow">
                <Text style={["text_left2", "f16h30", "fblock9"]}>支付宝充值：</Text>
                <Text style={["flex1", "f16h30", "fblock3"]}>4578.22</Text>
              </View>
              <View style="flexrow">
                <Text style={["text_left2", "f16h30", "fblock9"]}>微信充值：</Text>
                <Text style={["flex1", "f16h30", "fblock3"]}>885214.22</Text>
              </View>
            </View>
          </ScrollView>
          <View style="bottom_btn2">
              <Text style="bb2_text">重新上传</Text>
          </View>
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