
import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator, StackNavigator } from 'react-navigation';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import insertStyle from '../../assets/style'
import Storage from '../asyncStorage'
import fetchs from '../fetch'

import AuthLoading from '../../component/AuthLoading'
import HomeScreenManager from '../../component/Tabbar/homeManager'
import HomeScreenStore from '../../component/Tabbar/homeStore'

import storeScreen from '../../component/Tabbar/store'
import mineScreen from "../../component/Tabbar/mine";
import reportScreen from '../../component/Tabbar/report'

import { rpartA, defaultRouter } from './rPartA'
import rpartB from './rPartB'
import Icon from "react-native-vector-icons/Entypo";

// tabbar路由配置
const headerStyleB = {
  backgroundColor: '#2073D3',
}
const headerTitleStyleB = {
  color: '#fff'
}
const icon = {
  width: 20,
  height: 20
}
/* 店长 */
const tabbarStore = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({
        HomeScreen: {
          screen: HomeScreenStore,
          navigationOptions: ({ navigation }) => ({
            title: navigation.getParam('title','首页'),
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
          }),
        }
      })
      ,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '首页',
        tabBarIcon: ({ focused, tintColor }) => (
          focused ? <Image style={icon} source={require('../../assets/image/img/home.png')} /> : <Image style={icon} source={require('../../assets/image/img/un_home.png')} />
        ),
        // tabBarOnPress:({navigation,defaultHandler})=>{
        //   console.log(navigation,defaultHandler)
        // }
      })
    },
    Report: {
      screen: createStackNavigator({
        reportScreen: {
          screen: reportScreen,
          navigationOptions: {
            title: '报表管理',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
          }
        }
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '报表',
        tabBarIcon: ({ focused, tintColor }) => (
          focused ? <Image style={icon} source={require('../../assets/image/img/report.png')} /> : <Image style={icon} source={require('../../assets/image/img/un_report.png')} />
        )
      })
    },
    Mine: {
      screen: createStackNavigator({
        mineScreen: {
          screen: mineScreen,
          navigationOptions: {
            title: '首页',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
          }
        
        }
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          focused ? <Image style={icon} source={require('../../assets/image/img/my.png')} /> : <Image style={icon} source={require('../../assets/image/img/un_my.png')} />
        )
      })
    },
  }, {
    initialRouteName: 'Home',
    lazy: true,
    tabBarOptions: {
      // inactiveTintColor: "#8F8F8F",
      // activeTintColor: "#ED5601",
      labelStyle: {
        marginBottom: 4,
        fontSize: 12,
      },
    }

  }
)

/* 业务经理 */
const tabbarManager = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({
        HomeScreen: {
          screen: HomeScreenManager,
          navigationOptions: ({ navigation }) => ({
            title: '首页',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
          }),
        }
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '首页',
        tabBarIcon: ({ focused, tintColor }) => (
          focused ? <Image style={icon} source={require('../../assets/image/img/home.png')} /> : <Image style={icon} source={require('../../assets/image/img/un_home.png')} />
        )
      })
    },
    Store: {
      screen: createStackNavigator({
        storeScreen: {
          screen: storeScreen,
          navigationOptions: ({ navigation }) => {
            return {
              title: '门店管理',
              headerStyle: headerStyleB,
              headerTitleStyle: headerTitleStyleB,
              headerRight: (
                <Icon name="plus" size={32} color="#fff" onPress={() => navigation.navigate('joinstore')} />
              )
            }
          }
        }
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '门店',
        tabBarIcon: ({ focused, tintColor }) => (
          focused ? <Image style={icon} source={require('../../assets/image/img/store.png')} /> : <Image style={icon} source={require('../../assets/image/img/un_store.png')} />
        )
      })
    },
  
    Mine: {
      screen: createStackNavigator({
        mineScreen: {
          screen: mineScreen,
          navigationOptions: ({ navigation }) => ({
            title: '我的',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
            // tabBarOnPress: (value) => {
            //   //监听点击事件
            //   value.defaultHandler();

            //   // const defaultHandler = () => {
            //   //         if (navigation.isFocused()) {
            //   //           if (route.hasOwnProperty('index') && route.index > 0) {
            //   //             // If current tab has a nested navigator, pop to top
            //   //             navigation.dispatch(StackActions.popToTop({ key: route.key }));
            //   //           } else {
            //   //             // TODO: do something to scroll to top
            //   //           }
            //   //         } else {
            //   //           this._jumpTo(route.routeName);
            //   //         }
            //   //       };
            //   console.log('点击了工作');

            // }

          })
        }
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          focused ? <Image style={icon} source={require('../../assets/image/img/my.png')} /> : <Image style={icon} source={require('../../assets/image/img/un_my.png')} />
        )
      })
    },
  }, {
    initialRouteName: 'Home',
    // lazy: true,
    tabBarOptions: {
      // inactiveTintColor: "#8F8F8F",
      // activeTintColor: "#ED5601",
      labelStyle: {
        marginBottom: 4,
        fontSize: 12,
      },
    }
  }
)

const RouteConfigs = {
  TabbarStore: {
    screen: tabbarStore,
    navigationOptions: ({ navigation }) => (
      {
        header: null,
        headerBackTitle: 'A much too long text for back button from B to A',
        headerTruncatedBackTitle: ` `,
      })
  },
  TabbarManager: {
    screen: tabbarManager,
    navigationOptions: ({ navigation }) => (
      {
        header: null,
        headerBackTitle: 'A much too long text for back button from B to A',
        headerTruncatedBackTitle: ` `,
      })
  },
  AuthLoading: {
    screen: AuthLoading,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
}
const initialRouteName = "AuthLoading"
// defaultRouter
export default StackNavigator(Object.assign({}, RouteConfigs, rpartA, rpartB), {
  initialRouteName: initialRouteName,
  // headerMode: 'none',
  transitionConfig: () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    // screenInterpolator: (sceneProps) => {
    //   return StackViewStyleInterpolator.forHorizontal
    //   const { scene } = sceneProps;
    //   const { route, index } = scene;
    //   const params = route.params || {};
    //   const transition = params.transition||"forHorizontal";
    //   return StackViewStyleInterpolator[transition]
    //   // console.log(transition)
    //   // if(transition=='enter'){
    //   //   return StackViewStyleInterpolator.forHorizontal
    //   // }else {
    //   //   return StackViewStyleInterpolator.forHorizontal
    //   // }

    // },
  }),
});