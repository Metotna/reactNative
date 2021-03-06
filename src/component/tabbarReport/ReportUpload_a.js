
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    Platform,
    ScrollView,
    TextInput,
    Dimensions
} from 'react-native';
import {List, Toast} from 'antd-mobile-rn'

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
                sellImg:this.props.navigation.state.params.img,
                dateMemo:this.props.navigation.state.params.pdata.dateMemo,
                sn:this.props.navigation.state.params.pdata.sn,
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
            },
            imageh:220,
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
        this.props.navigation.navigate('uploadreportT', {
            pdata:this.state.data,
            path:'a'
        });

        /*this.state.data.openTime = moment(this.state.deftime).format('YYYY-MM-DD HH:mm:ss');
        this.state.data.sellLot = this.sellLot(this.state.Change);
        if(!this.checkdata(this.state.data)){
            return false;
        }
        this.state.data.withdrawal = this.selwithdrawal(this.state.data.withdrawal);
        http.loadingPost('/netbar/machine/edit',this.state.data).then(res=>{
            console.log(res)
            if(res.status == '200'){
                Alert.alert(res.msg);
                this.props.navigation.state.params.dopost();
                this.props.navigation.goBack();
                //this.props.navigation.navigate('cpjmanagement',{id:this.state.data.shopId});
            }
        }).catch(err=>{
            console.log(err)
        })
        console.log(this.state.data)*/
    }

    //rende之后调用
    componentDidMount(){
        //console.log(this.state)
        let screenWidth = Dimensions.get('window').width;
        Image.getSize(this.state.data.sellImg, (width, height) => {
            let r = screenWidth / (width / height)
            this.setState({ imageh: r })

            //width 图片的宽度
            //height 图片的高度
        })
    }

    render() {
        return (
            <Keyboard>
                <View style={["pagebox"]}>
                    <View style={["topbox"]}>
                        <ScrollView>
                            <View style={["bannerbox"]}>
                                <Image
                                    style={{width:width,height:this.state.imageh,display:'flex'}}
                                    source={this.state.data.sellImg ? {uri:this.state.data.sellImg} : require('../../assets/image/banner/1.jpg')}
                                />
                            </View>
                            <View style={["itembox"]}>
                                <Text style={["texta"]}>日期：</Text>
                                <Text style={["textb"]}>{this.state.data.dateMemo}</Text>
                            </View>
                            <View style={["itembox"]}>
                                <Text style={["texta"]}>机器编号：</Text>
                                <Text style={["texta"]}>{this.state.data.sn}</Text>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox",stylesA.topbor]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>总销售（已减取消）</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox",stylesA.iptvertical]}
                                        placeholder={'请输入总销售'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data:{...this.state.data, ...{allSell: text}}
                                            })
                                        }}
                                        value={this.state.data.allSell}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>线下销售（已减取消）</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入线下销售'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data:{...this.state.data, ...{offlineSell: text}}
                                            })
                                        }}
                                        value={this.state.data.offlineSell}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>线上销售（已减取消）</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入线上销售'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data:{...this.state.data, ...{onlineSell: text}}
                                            })
                                        }}
                                        value={this.state.data.onlineSell}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>其中竞彩（已减取消）</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入其中竞彩'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data:{...this.state.data, ...{jcSell: text}}
                                            })
                                        }}
                                        value={this.state.data.jcSell}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>总兑奖</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入总兑奖'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data:{...this.state.data, ...{allBonus: text}}
                                            })
                                        }}
                                        value={this.state.data.allBonus}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>线下兑奖</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入线下兑奖'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data:{...this.state.data, ...{offlineBonus: text}}
                                            })
                                        }}
                                        value={this.state.data.offlineBonus}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>线上兑奖</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入线上兑奖'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data:{...this.state.data, ...{onlineBonus: text}}
                                            })
                                        }}
                                        value={this.state.data.onlineBonus}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>取消</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入取消'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data:{...this.state.data, ...{cancel: text}}
                                            })
                                        }}
                                        value={this.state.data.cancel}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>实退</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入实退'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data:{...this.state.data, ...{refund: text}}
                                            })
                                        }}
                                        value={this.state.data.refund}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <View style={[stylesA.textv]}>
                                    <Text style={["text"]}>应缴款</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入应缴款'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data:{...this.state.data, ...{payment: text}}
                                            })
                                        }}
                                        value={this.state.data.payment}
                                        keyboardType={"numeric"}
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
                            <View style={stylesA.textb}>
                                <Text style={{
                                    fontSize:12,
                                    color:'#E7505A',
                                }}>请仔细核对销售数据</Text>
                            </View>
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
    topbor:{
        borderColor: '#eee',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    textv: {
        justifyContent:'center',
    },
    textb:{
        justifyContent:'center',
        height:40,
    },
    iptvertical:{
        paddingVertical: 0
    }
})