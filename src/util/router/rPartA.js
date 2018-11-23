
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

import rExamine from '../../component/tabbarReport/examineReport'

export const defaultRouter ='NetBarDetail'
const headerStyleB={
  backgroundColor: '#2073D3',
}
const headerTitleStyleB={
  color: '#fff'
}
export const rpartA = {
  /* login  */
  login: {
    screen: login,
    navigationOptions: ({ navigation }) => ({
      header: null,
      headerBackTitle: '返回',
    }),
  },
  forgetPassword: {
    screen: forgetPwd,
    navigationOptions: ({ navigation }) => ({
      title: '忘记密码',
      headerTintColor: '#333',
      headerBackTitle: '上一步',
    }),
  },
  setPassword: {
    screen: setPwd,
    navigationOptions: ({ navigation }) => ({
      title: '设置密码',
      headerTintColor: '#333',
    }),
  },
  /* tabarHome */
  handleReport:{
    screen: hReport,
    navigationOptions: ({ navigation }) => ({
      title: '报表管理',
      headerStyle: headerStyleB,
      headerTitleStyle: headerTitleStyleB,
      headerBackImage:Backicon,
      headerBackTitle: ' ',
    }),
  },
  NetBarDetail:{
    screen: hNetBarDetail,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('title','xx网吧'),
      headerStyle: headerStyleB,
      headerTitleStyle: headerTitleStyleB,
      headerBackImage:Backicon,
      headerBackTitle: ' ',
    }),
  },
  NetBarDay:{
    screen: hNetBarDay,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('title','每日明细'),
      headerStyle: headerStyleB,
      headerTitleStyle: headerTitleStyleB,
      headerBackImage:Backicon,
      headerBackTitle: ' ',
    }),
  },
  /* tabarMine */
  Setting:{
    screen: mSetting,
    navigationOptions: ({ navigation }) => ({
      title: '设置',
      headerStyle: headerStyleB,
      headerTitleStyle: headerTitleStyleB,
      headerBackImage:Backicon,
      headerBackTitle: ' ',
    }),
  },
  Reseting:{
    screen: mReseting,
    navigationOptions: ({ navigation }) => ({
      title: '修改密码',
      headerStyle: headerStyleB,
      headerTitleStyle: headerTitleStyleB,
      headerBackImage:Backicon,
      headerBackTitle: ' ',
    }),
  },

  /* tabarReport */
  Examine:{
    screen: rExamine,
    navigationOptions: ({ navigation }) => ({
      title: '查看报表',
      headerStyle: headerStyleB,
      headerTitleStyle: headerTitleStyleB,
      headerBackImage:Backicon,
      headerBackTitle: ' ',
    }),
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