
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, TextInput, Dimensions, Image ,ScrollView,KeyboardAvoidingView} from 'react-native';
// import { Button, CheckBox } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import { Toast } from 'antd-mobile-rn'
import Btn from '../common/buttonplat'

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      checked: false,
      loading:false,
    };
    this.user=''
    this.loading=false;
    Storage.get("user").then(res=>{
      this.setState({user:res})

    })
    // console.log(this.props.navigation)
  }

  handleChoose = () => {
    // console.log(this.state.checked)
    this.setState({
      checked: !this.state.checked
    })
  }
  _handleLogin = () => {
    if(!this.state.user || !this.state.pwd){
      Toast.info('用户名或密码不能为空！', 1);
      return 
    }
    if(this.loading)return 
    this.loading=true;
    this.setState({
      loading:true,
    })
    // showLoading()
    http.post('/user/login', {
      username: this.state.user,
      password: this.state.pwd,
      busId: "NETBAR"
    }, true).then(res => {
      // closeLoading()
        //console.log(res)
      if (res) {
        if (res.status == 200) {
          let rule = res.data.myInfo.roleVOS[0].key;
          if (rule == 'ADMIN' || rule == "BUSM" || rule == "SHOPM") {
            this.loading=false;
            this.setState({
              loading:false,
            })
            Storage.saveObj({
              user: this.state.user,
              token: res.data.token,
              rule:rule,
            })
            var routeName = (rule == 'ADMIN' || rule == "BUSM") ? "TabbarManager" : "TabbarStore"
         this.props.navigation.reset([NavigationActions.navigate({ routeName })],0)

          } else {
            Toast.fail('当前登录账号无效！', 1);
          }
        } else {
          this.loading=false;
          this.setState({
            loading:false,
          })
          Toast.fail(res.msg, 1);
        }
      }
    }).catch(err => {
      this.loading=false;
      this.setState({
        loading:false,
      })
    })
  }

  render() {
    return (
      <ScrollView style={css.container} keyboardShouldPersistTaps={'handled'}>
        <Text style={{ height: (Platform.OS === 'ios') ? 20 : 0, }}></Text>
        <Text style={css.titles}>必赢门店管理系统</Text>
        <View style={css.inputOut}>
          <Image
            style={css.inputIocn}
            source={require('../../assets/image/img/username.png')}
          />
          <TextInput style={css.inputs}
          value={this.state.user}
            placeholder="请输入账号"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({ user: text })} />
        </View>
        <View style={css.inputOut}>
          <Image
            style={css.inputIocn}
            source={require('../../assets/image/img/password.png')}
          />
          <TextInput style={css.inputs}
          value={this.state.pwd}

            placeholder="请输入密码"
            secureTextEntry
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({ pwd: text })} />
        </View>
        <View style={css.checkboxFather}>
          {/* <CheckBox
            containerStyle={css.checkbox}
            title='默认登录'
            left
            size={20}
            checked={this.state.checked}
            checkedColor='#fff'
            textStyle={{ color: '#fff', height: 20, lineHeight: 15, marginLeft: 5 }}
            uncheckedColor='#fff'
            onPress={() => {
              this.setState({
                checked: !this.state.checked
              })
            }}
          /> */}
           <Text></Text>
          <Text style={css.checkText} onPress={() => this.props.navigation.navigate('forgetPassword')}>忘记密码？</Text>
        </View>
          <Btn loading={this.state.loading} textStyle={{ fontSize: 16,color: '#2073D3', }} style={{height:40,backgroundColor:"#fff",}} onPress={this._handleLogin}>登录</Btn>
      </ScrollView>
    );
  }

}
{/* <Button title="Go to Details"  onPress={() => this.props.navigation.navigate('Page4')}  /> */ }
const w = Dimensions.get('window').width
const css = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#227ed8',
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom:30,
  },
  titles: {
    fontSize: 30,
    color: '#FFF',
    paddingBottom: 60,
    textAlign: 'center'
  },
  inputOut: {
    alignSelf: 'stretch',
    position: 'relative',
  },
  inputIocn: {
    position: 'absolute',
    left: 20,
    top: 10,
    width: 20,
    height: 20,
    zIndex: 2,
  },
  inputs: {
    backgroundColor: '#ffffff',
    color: '#333',
    padding: 0,
    height: 40,
    marginBottom: 8,
    borderRadius: 5,
    paddingLeft: 60,
    fontSize: 15,
  },
  checkboxFather: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
    height: 60,
  },
  checkbox: {
    backgroundColor: '#227ed8',
    borderWidth: 0,
    padding: 0,
    margin: 0,
    marginLeft: 0,
  },
  checkText: {
    fontSize: 14,
    height: 20,
    lineHeight: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  btns: {
    marginLeft: -15,
    marginRight: -15,
  }
});