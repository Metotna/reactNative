
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    TextInput,
} from 'react-native';

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import  Button from  '../common/button'
import {Toast } from 'antd-mobile-rn'


const cssStyle =Object.assign({},style({}).idjoin,styleP({}).public)
@rn_Less.rnLess(cssStyle)

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:{
                name:'',
                phone:'',
                pwd:'123456',
                role:'SHOPM',
                shopId:this.props.navigation.getParam('shopid'),
            },
        };
    }

    //非空检查
    checkdata =(obj)=>{
        for (var prop in obj) {
            if(!obj[prop]){
                console.log(prop)
                Toast.show('请补充完整数据提交');
                return false;
            }
        }
        return true;
    }

    //修改提交
    dopost =()=> {
        if(!this.checkdata(this.state.data)){
            return false;
        }
        http.loadingPost('/netbar/account/edit',this.state.data).then(res=>{
            /* Storage.saveObj({
                 user:res.data.token,
                 token:res.data.token
             })*/
            console.log(res)
            if(res.status == '200'){
                Toast.show(res.msg,3);
                this.props.navigation.state.params.dopost();
                this.props.navigation.goBack();
            }
        }).catch(err=>{
            console.log(err)
        })
        console.log(this.state.data)
    }


    render() {
        return (
            <View style={{marginTop:6}}>
                <View style={["ls_box"]}>
                    <View style={["bgfff","flexrow","ls_conbox"]}>
                        <View style={"txetv"}>
                            <Text style={["col999","text","fontsize14"]}>姓名：</Text>
                        </View>
                        <View>
                            <TextInput
                                style={["inputbox"]}
                                placeholder={'请输入姓名'}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => {
                                    this.setState({
                                        data: Object.assign({}, this.state.data, {name: text})
                                    })
                                }}
                            />
                        </View>
                    </View>
                    <View style={["bgfff","flexrow","ls_conbox"]}>
                        <View style={"txetv"}>
                            <Text style={["col999","text","fontsize14"]}>手机号码：</Text>
                        </View>
                        <View>
                            <TextInput
                                style={["inputbox"]}
                                placeholder={'请输入手机号码'}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => {
                                    this.setState({
                                        data: Object.assign({}, this.state.data, {phone: text})
                                    })
                                }}
                            />
                        </View>
                    </View>
                    <View style={["titbox"]}>
                        <View style={"txetv"}>
                            <Text style={["col999","fontsize14"]}>手机号码即账号，默认密码123456</Text>
                        </View>
                    </View>
                    <View style={["butbox"]}>
                        <Button onPress={this.dopost} style={{borderRadius:5}} textStyle={{
                            lineHeight: 36,
                            fontSize:17,
                            borderRadius:5
                        }} title={'确定'}/>
                    </View>
                </View>
            </View>

        );
    }

}

const styles = StyleSheet.create({
});