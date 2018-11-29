
import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator, StackNavigator } from 'react-navigation';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";
import { Text, View, StyleSheet, Image ,ActivityIndicator} from 'react-native';
import insertStyle from '../../assets/style'
import Storage from '../asyncStorage'
import fetchs from '../fetch'

import AuthLoading from '../../component/AuthLoading'
import HomeScreenR from '../../component/Tabbar/homeR'
import HomeScreenS from '../../component/Tabbar/homeS'

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

const tabbarS = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({
        HomeScreen: {
          screen: HomeScreenR,
          navigationOptions: {
            title: '首页R',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
          }
        }
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '首页R',
        tabBarIcon: ({ focused, tintColor }) => (
          focused ? <Image style={icon} source={require('../../assets/image/img/首页-选中.png')} /> : <Image style={icon} source={require('../../assets/image/img/首页-未选中.png')} />
        )
      })
    },
    Home2: {
      screen: createStackNavigator({
        HomeScreen: {
          screen: HomeScreenS,
          navigationOptions: {
            title: '首页S',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
          }
        }
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '首页S',
        tabBarIcon: ({ focused, tintColor }) => (
          focused ? <Image style={icon} source={require('../../assets/image/img/首页-选中.png')} /> : <Image style={icon} source={require('../../assets/image/img/首页-未选中.png')} />
        )
      })
    },
    Store: {
      screen: createStackNavigator({
        storeScreen: {
            screen: storeScreen,
            navigationOptions: ({navigation}) => {
                return {
                    title: '门店管理',
                    headerStyle: headerStyleB,
                    headerTitleStyle: headerTitleStyleB,
                    headerRight: (
                        <Icon name="plus" size={32} color="#fff" onPress={() => navigation.navigate('joinstore')}/>
                    )
                }
            }
        }
        }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '门店',
        tabBarIcon: ({ focused, tintColor }) => (
          focused ? <Image style={icon} source={require('../../assets/image/img/门店-选中.png')} /> : <Image style={icon} source={require('../../assets/image/img/门店-未选中.png')} />
        )
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
          focused ? <Image style={icon} source={require('../../assets/image/img/报表-选中.png')} /> : <Image style={icon} source={require('../../assets/image/img/报表-未选中.png')} />
        )
      })
    },
    Mine: {
      screen: createStackNavigator({
        mineScreen: {
          screen: mineScreen,
          navigationOptions: {
            title: '我的',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
          }
        }
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          focused ? <Image style={icon} source={require('../../assets/image/img/我的-选中.png')} /> : <Image style={icon} source={require('../../assets/image/img/我的.png')} />
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
const tabbarR = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({
        HomeScreen: {
          screen: HomeScreenR,
          navigationOptions: {
            title: '首页',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
          }
        }
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '首页',
        tabBarIcon: ({ focused, tintColor }) => (
          focused ? <Image style={icon} source={require('../../assets/image/img/首页-选中.png')} /> : <Image style={icon} source={require('../../assets/image/img/首页-未选中.png')} />
        )
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
          focused ? <Image style={icon} source={require('../../assets/image/img/报表-选中.png')} /> : <Image style={icon} source={require('../../assets/image/img/报表-未选中.png')} />
        )
      })
    },
    Mine: {
      screen: createStackNavigator({
        mineScreen: {
          screen: mineScreen,
          navigationOptions: {
            title: '我的',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
          }
        }
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          focused ? <Image style={icon} source={require('../../assets/image/img/我的-选中.png')} /> : <Image style={icon} source={require('../../assets/image/img/我的.png')} />
        )
      })
    },
  }, {
    initialRouteName: 'Mine',
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

const RouteConfigs = {
  TabbarS: {
    screen: tabbarS,
    navigationOptions: ({ navigation }) => (
      {
        header: null,
        headerBackTitle: 'A much too long text for back button from B to A',
        headerTruncatedBackTitle: ` `,
      })
  },
  TabbarR: {
    screen: tabbarR,
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
const initialRouteName = "TabbarS"
// defaultRouter
export default StackNavigator(Object.assign({}, RouteConfigs, rpartA, rpartB), {
  initialRouteName: initialRouteName,
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