
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, TextInput, Dimensions, Image } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      checked: false,
    };
  }

  handleChoose = () => {
    console.log(this.state.checked)
    this.setState({
      checked: !this.state.checked
    })
  }

  render() {
    return (
      <View style={css.container} >
        <Text style={{ height: (Platform.OS === 'ios') ? 20 : 0, }}></Text>
        <Text style={css.titles}>必赢网吧管理管理系统</Text>
        <View style={css.inputOut}>
          <Image
            style={css.inputIocn}
            source={require('../../assets/image/tab_btn_user_hl.png')}
          />
          <TextInput style={css.inputs}
            placeholder="请输入账号"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({ user: text })} />
        </View>
        <View style={css.inputOut}>
          <Image
            style={css.inputIocn}
            source={require('../../assets/image/tab_btn_user_hl.png')}
          />
          <TextInput style={css.inputs}
            placeholder="请输入密码"
            secureTextEntry
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({ pwd: text })} />
        </View>
        <View style={css.checkboxFather}>
          <CheckBox
            containerStyle={css.checkbox}
            title='记住密码'
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
          />
          <Text style={css.checkText}  onPress={() => this.props.navigation.navigate('forgetPassword')}>忘记密码？</Text>
        </View>
        <Button style={css.btns}
        backgroundColor='#fff'
        borderRadius={5}
        color='#227ed8'
        textStyle={{fontSize:16}}
          icon={{ name: 'cached' }}
          title='登录' 
          onPress={() => this.props.navigation.navigate('Tabbar')}/>
      </View>
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
  },
  titles: {
    fontSize: 20,
    color: '#FFF',
    paddingBottom: 30,
    textAlign: 'center'
  },
  inputOut: {
    alignSelf: 'stretch',
    position: 'relative',
  },
  inputIocn: {
    position: 'absolute',
    left: 15,
    top: 5,
    width: 30,
    height: 30,
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
    fontSize:15,
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
    marginLeft:-15,
    marginRight:-15,
  }
});