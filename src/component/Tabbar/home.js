
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ListView, Alert, ScrollView, TouchableHighlight, } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tabs } from 'antd-mobile-rn'
import * as userActions from '../../util/redux/action/user';
import DateTable from '../tabbarHome/component/dateTable'

@insertStyle('TabbarHomeStyle')
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
  _onPressButton = () => {
    console.log(1452287)
  }

  render() {
    const tabs = [
      { title: '昨日排行' },
      { title: '本月排行' },
      { title: '上月排行' },
    ];
    return (
      <View style='container'>
        <View style="total">
          <DateTable />
          <View style="total_title">
            <Text style="total_text">5条报表待审核，5家网吧未上传</Text>
            <Button size="small" onClick={() => this.props.navigation.navigate('handleReport')}>立即处理</Button>
          </View>

        </View >
        <View style="listView">
          <Tabs tabs={tabs} initialPage={0} >
            <View style="tab_list">
              <ListView dataSource={this.state.data} renderRow={(rowData) => <DateTable name={rowData} />} />
            </View>
            <ScrollView >

              <DateTable name={'测试用例10'} date={'2018'} />
            </ScrollView>
            <ScrollView style="tab_list">
          
              <DateTable name={'测试用例15'} date={'2018'} />
            </ScrollView>
          </Tabs>
        </View>
        {/* <DateTable name={'测试用例'} date={'2018'} /> */}
      </View>
    );
  }
  handleClick = () => {
    if (Platform.OS === 'ios') {
      Alert.alert('测试当前平台', 'iOS平台');
    } else if (Platform.OS === 'android') {
      Alert.alert('测试当前平台', 'Android平台');
    }
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