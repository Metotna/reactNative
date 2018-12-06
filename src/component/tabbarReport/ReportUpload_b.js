
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    Platform,
    ScrollView,
    TextInput,
    Dimensions, DeviceEventEmitter
} from 'react-native';
import {List, DatePicker,Toast} from 'antd-mobile-rn'

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import  Button from  '../common/button'
import Keyboard from '../common/keyboard'

var {height,width} =  Dimensions.get('window');

const cssStyle =Object.assign({},style({}).ReportUpload,styleP({}).public)
@rn_Less.rnLess(cssStyle)

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:{
                chargeImg:this.props.navigation.state.params.img,
                dateMemo:this.props.navigation.state.params.pdata.dateMemo,
                sn:this.props.navigation.state.params.pdata.sn,
                sellImg:'',
                allSell:'',
                offlineSell:'',
                onlineSell:'',
                jcSell:'',
                allBonus:'',
                offlineBonus:'',
                onlineBonus:'',
                cancel:'',
                refund:'',
                payment:'',
                bankCharge:'',
                aliCharge:'',
                wxCharge:'',
            },
            pdata:this.props.navigation.state.params.pdata,
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

    //重传
    goBack =()=>{
        this.props.navigation.goBack();
    }

    //提交
    dopost =()=> {
        if(!this.checkdata(this.state.data)){
            return false;
        }
        http.loadingPost('/netbar/report/upload',this.state.data).then(res=>{
            //console.log(res)
            if(res.status == '200'){
                Toast.show(res.msg,3);
                DeviceEventEmitter.emit('refreshSellDetailList', 'suc');//添加广播
                this.props.navigation.navigate('Report');
                //this.props.navigation.navigate('cpjmanagement',{id:this.state.data.shopId});
            }
        }).catch(err=>{
            console.log(err)
        })
        //console.log(this.state.data)
    }

    //rende之后调用
    componentDidMount(){
        //console.log(this.state.pdata);
        const pdata = this.state.pdata;
        for(let k in pdata){
            //console.log(k)
            this.state.data[k] = pdata[k];
        }
    }

    render() {
        return (
            <Keyboard>
                <View style={["pagebox"]}>
                    <View style={["topbox"]}>
                        <ScrollView>
                            <View style={["bannerbox"]}>
                                {
                                    this.state.data.chargeImg
                                        ?
                                        <Image
                                            style={{width:width,height:220,display:'flex'}}
                                            source={{uri:this.state.data.chargeImg}}
                                        />
                                        :
                                        <Image
                                            style={{width:width,height:220,display:'flex'}}
                                            source={require('../../assets/image/banner/1.jpg')}
                                        />

                                }
                            </View>
                            <View style={["itembox"]}>
                                <Text style={["texta"]}>日期：</Text>
                                <Text style={["textb"]}>{this.state.data.dateMemo}</Text>
                            </View>
                            <View style={["itembox"]}>
                                <Text style={["texta"]}>机器编号：</Text>
                                <Text style={["texta"]}>{this.state.data.sn}</Text>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>银行卡充值</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入银行卡充值'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data: Object.assign({}, this.state.data, {bankCharge: text})
                                            })
                                        }}
                                        value={this.state.data.bankCharge}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>支付宝充值</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入支付宝充值'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data: Object.assign({}, this.state.data, {aliCharge: text})
                                            })
                                        }}
                                        value={this.state.data.aliCharge}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>微信充值</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入微信充值'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data: Object.assign({}, this.state.data, {wxCharge: text})
                                            })
                                        }}
                                        value={this.state.data.wxCharge}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={["butbox"]}>
                        <Button onPress={this.goBack} style={{borderRadius:5,width:100,height:40,backgroundColor:'#fff',borderColor:'#2073D3',borderStyle:'solid',borderWidth:1}} textStyle={{
                            lineHeight: 26,
                            fontSize:17,
                            color:'#2073D3'
                        }} title={'重传'}/>
                        <View style={{
                            width:138
                        }}>
                            <Text style={{
                                fontSize:12,
                                lineHeight:40,
                                color:'#E7505A',
                                textAlign:"center"
                            }}>请仔细核对销售数据</Text>
                        </View>
                        <Button onPress={this.dopost} style={{borderRadius:5,width:100,height:40}} textStyle={{
                            lineHeight: 26,
                            fontSize:17
                        }} title={'下一步'}/>
                    </View>
                </View>
            </Keyboard>

        );
    }

}

const stylesA = StyleSheet.create({
    textv: {
        justifyContent:'center',
    },
})