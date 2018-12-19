
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Backicon from '../../component/common/backicon'

import login from '../../component/login'
import forgetPwd from '../../component/login/forget'
import setPwd from '../../component/login/setpwd'
import hReport from '../../component/tabbarHome/handleReport'
import hNetBarDetail from '../../component/tabbarHome/netBarDetail'
import hNetBarDay from '../../component/tabbarHome/netBarDay'

import mSetting from '../../component/tabbarMine/setting'
import mReseting from '../../component/tabbarMine/resetting'
import mStoreInfo from '../../component/tabbarMine/storeInfo'
import mCompanyInfo from '../../component/tabbarMine/companyInfo'


import rExamine from '../../component/tabbarReport/examineReport'
import uploadreport from '../../component/tabbarReport/uploadreport'
import ReportUpload_a from '../../component/tabbarReport/ReportUpload_a'
import uploadreportT from '../../component/tabbarReport/uploadreportT'
import ReportUpload_b from '../../component/tabbarReport/ReportUpload_b'

export const defaultRouter ='handleReport'
const headerStyleB={
  backgroundColor: '#2073D3',
}
const headerTitleStyleB={
  color: '#fff',
  // alignSelf:'center',
  // textAlign: 'center',
  // flex:1,
}
function comOption(title){
return {
  title: title,
  headerStyle: headerStyleB,
  headerTitleStyle: headerTitleStyleB,
  headerBackImage:Backicon,
  headerBackTitle: ' ',
}
}
export const rpartA = {
  /* login  */
  login: {
    screen: login,
    navigationOptions: ({ navigation }) => ({
      header: null,
      headerBackTitle: '返回',
      headerStyle: headerStyleB,
      headerTitleStyle: headerTitleStyleB,
      headerBackImage:Backicon,
    }),
  },
  forgetPassword: {
    screen: forgetPwd,
    navigationOptions: ({ navigation }) => ({
      title: '忘记密码',
      headerTintColor: '#fff',
      headerStyle: headerStyleB,
      headerTitleStyle: headerTitleStyleB,
      headerBackImage:Backicon,
      headerBackTitle: '上一步',
    }),
  },
  setPassword: {
    screen: setPwd,
    navigationOptions: ({ navigation }) => ({
      title: '设置密码',
      headerTintColor: '#fff',
      headerStyle: headerStyleB,
      headerTitleStyle: headerTitleStyleB,
      headerBackImage:Backicon,
    }),
  },
  /* tabarHome */
  handleReport:{
    screen: hReport,
    navigationOptions: ({ navigation }) => (comOption('报表管理')),
  },
  NetBarDetail:{
    screen: hNetBarDetail,
    navigationOptions: ({ navigation }) => (comOption(navigation.getParam('title','xx网吧'))),
  },
  NetBarDay:{
    screen: hNetBarDay,
    navigationOptions: ({ navigation }) => (comOption(navigation.getParam('title','每日明细'))),
  },
  /* tabarMine */
  Setting:{
    screen: mSetting,
    navigationOptions: ({ navigation }) => (comOption('设置')),
  },
  Reseting:{
    screen: mReseting,
    navigationOptions: ({ navigation }) => (comOption('修改密码')),
  },
  StoreInfo:{
    screen: mStoreInfo,
    navigationOptions: ({ navigation }) => (comOption('门店信息'))
  },
  CompanyInfo:{
    screen: mCompanyInfo,
    navigationOptions: ({ navigation }) => (comOption('必赢信息'))
  },

  // (comOption('确认销售报表')),
   /* 上传销售报表 */
    uploadreport:{
        screen: uploadreport,
    },
    /* 上传缴款报表 */
    uploadreportT:{
        screen: uploadreportT,
    },
    /* 确认销售报表 */
    ReportUpload_a:{
        screen: ReportUpload_a,
        navigationOptions: ({ navigation }) => (comOption('确认销售报表')),
    },
    /* 确认缴款报表 */
    ReportUpload_b:{
        screen: ReportUpload_b,
        navigationOptions: ({ navigation }) => (comOption('确认缴款报表')),
    },
  /* tabarReport */
  Examine:{
    screen: rExamine,
    navigationOptions: ({ navigation }) =>(comOption('查看报表')),
  },
  
}
const styles = StyleSheet.create({
  icon: {
   marginLeft:5,
  },
  bgc:{
    backgroundColor: '#2073D3',
  },
  bgcfc:{
    color:'#fff',
  }
})